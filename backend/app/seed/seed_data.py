from datetime import datetime, timedelta
from sqlalchemy import select
from app.db.session import SessionLocal
from app.db.base import Base
from app.db.session import engine
from app.models import Commodity, Location, CommodityPrice, RiskAssessment, Alert, Forecast, RecommendedAction
from app.core.risk import risk_level, risk_color

COMMODITIES=["Tomato","Onion","Potato","Wheat","Rice","Maize","Soybean","Cotton"]
LOCATIONS=[("Nashik","Maharashtra","WEST"),("Indore","Madhya Pradesh","CENTRAL"),("Azadpur","Delhi","NORTH"),("Kolar","Karnataka","SOUTH"),("Kurnool","Andhra Pradesh","SOUTH"),("Jaipur","Rajasthan","NORTH")]
def seed():
    Base.metadata.create_all(bind=engine)
    db=SessionLocal()
    try:
        if db.scalar(select(Commodity.id).limit(1)): return
        cs=[]
        for name in COMMODITIES:
            c=Commodity(name=name,unit="quintal",category="agri")
            db.add(c); cs.append(c)
        ls=[]
        for name,state,region in LOCATIONS:
            l=Location(name=name,state=state,region=region)
            db.add(l); ls.append(l)
        db.flush()
        now=datetime.utcnow()
        for i,c in enumerate(cs):
            for j,l in enumerate(ls):
                score=[18,34,58,82,44,67,24,77][(i+j)%8]
                r=RiskAssessment(commodity_id=c.id,location_id=l.id,score=score,
                    level=risk_level(score),color=risk_color(risk_level(score)),
                    factors=[{"name":"Price volatility","impact":round(score*.4,1)},
                             {"name":"Supply pressure","impact":round(score*.35,1)},
                             {"name":"Weather signal","impact":round(score*.25,1)}],
                    timestamp=now)
                db.add(r)
                if score>=76:
                    a=Alert(location_id=l.id,commodity_id=c.id,severity="CRITICAL",status="NEW",
                            title=f"{c.name} price risk in {l.name}",
                            message="Elevated price and supply risk requires monitoring.",
                            timestamp=now)
                    db.add(a); db.flush()
                    db.add(RecommendedAction(risk_id=r.id,alert_id=a.id,priority="HIGH",status="PENDING",
                        summary=f"Monitor {c.name} supply and price movement.",
                        actions=["Monitor arrivals","Review procurement plans","Coordinate with local stakeholders"],
                        rationale="Risk score is in the critical range.",
                        disclaimer="Decision support only; verify with official market information."))
                for d in range(30):
                    price=1000+i*120+j*20+d*3+((d*17+i*11+j*7)%31)
                    db.add(CommodityPrice(commodity_id=c.id,location_id=l.id,date=now-timedelta(days=29-d),modal_price=price,min_price=price*.92,max_price=price*1.08))
                for d in range(7):
                    p=1000+i*120+j*20+30+d*4
                    db.add(Forecast(commodity_id=c.id,location_id=l.id,forecast_date=now+timedelta(days=d+1),
                                    predicted_price=p,lower_bound=p*.94,upper_bound=p*1.06,confidence=82,trend="RISING"))
        db.commit()
    finally: db.close()
if __name__=="__main__": seed()
