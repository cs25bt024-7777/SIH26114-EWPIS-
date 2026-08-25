from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
revision="001_initial_schema"
down_revision=None
branch_labels=None
depends_on=None
def upgrade():
    op.create_table("commodities",sa.Column("id",sa.Integer(),primary_key=True),sa.Column("name",sa.String(100),nullable=False),sa.Column("unit",sa.String(30),nullable=False),sa.Column("category",sa.String(50),nullable=False),sa.Column("is_active",sa.Boolean(),nullable=False),sa.Column("created_at",sa.DateTime(),server_default=sa.func.now()))
    op.create_index("ix_commodities_name","commodities",["name"],unique=True)
    op.create_table("locations",sa.Column("id",sa.Integer(),primary_key=True),sa.Column("name",sa.String(120),nullable=False),sa.Column("state",sa.String(100),nullable=False),sa.Column("region",sa.String(50),nullable=False),sa.Column("latitude",sa.Float()),sa.Column("longitude",sa.Float()))
    op.create_table("commodity_prices",sa.Column("id",sa.Integer(),primary_key=True),sa.Column("commodity_id",sa.Integer(),sa.ForeignKey("commodities.id",ondelete="CASCADE"),nullable=False),sa.Column("location_id",sa.Integer(),sa.ForeignKey("locations.id",ondelete="SET NULL")),sa.Column("date",sa.DateTime(),nullable=False),sa.Column("modal_price",sa.Numeric(12,2),nullable=False),sa.Column("min_price",sa.Numeric(12,2)),sa.Column("max_price",sa.Numeric(12,2)))
    op.create_index("ix_price_commodity_date","commodity_prices",["commodity_id","date"])
    op.create_table("risk_assessments",sa.Column("id",sa.Integer(),primary_key=True),sa.Column("commodity_id",sa.Integer(),sa.ForeignKey("commodities.id",ondelete="CASCADE"),nullable=False),sa.Column("location_id",sa.Integer(),sa.ForeignKey("locations.id",ondelete="CASCADE"),nullable=False),sa.Column("score",sa.Numeric(5,2),nullable=False),sa.Column("level",sa.String(20),nullable=False),sa.Column("color",sa.String(20),nullable=False),sa.Column("factors",sa.JSON(),nullable=False),sa.Column("timestamp",sa.DateTime(),nullable=False))
    op.create_table("forecasts",sa.Column("id",sa.Integer(),primary_key=True),sa.Column("commodity_id",sa.Integer(),sa.ForeignKey("commodities.id",ondelete="CASCADE"),nullable=False),sa.Column("location_id",sa.Integer(),sa.ForeignKey("locations.id",ondelete="SET NULL")),sa.Column("forecast_date",sa.DateTime(),nullable=False),sa.Column("predicted_price",sa.Numeric(12,2),nullable=False),sa.Column("lower_bound",sa.Numeric(12,2)),sa.Column("upper_bound",sa.Numeric(12,2)),sa.Column("confidence",sa.Numeric(5,2)),sa.Column("trend",sa.String(30),nullable=False))
    op.create_table("alerts",sa.Column("id",sa.Integer(),primary_key=True),sa.Column("location_id",sa.Integer(),sa.ForeignKey("locations.id",ondelete="CASCADE"),nullable=False),sa.Column("commodity_id",sa.Integer(),sa.ForeignKey("commodities.id",ondelete="SET NULL")),sa.Column("severity",sa.String(20),nullable=False),sa.Column("status",sa.String(30),nullable=False),sa.Column("title",sa.String(200),nullable=False),sa.Column("message",sa.Text(),nullable=False),sa.Column("timestamp",sa.DateTime(),nullable=False))
    op.create_table("recommended_actions",sa.Column("id",sa.Integer(),primary_key=True),sa.Column("risk_id",sa.Integer(),sa.ForeignKey("risk_assessments.id",ondelete="SET NULL")),sa.Column("alert_id",sa.Integer(),sa.ForeignKey("alerts.id",ondelete="SET NULL")),sa.Column("priority",sa.String(20),nullable=False),sa.Column("status",sa.String(30),nullable=False),sa.Column("summary",sa.Text(),nullable=False),sa.Column("actions",sa.JSON(),nullable=False),sa.Column("rationale",sa.Text(),nullable=False),sa.Column("disclaimer",sa.Text(),nullable=False),sa.Column("created_at",sa.DateTime(),nullable=False))
def downgrade():
    for table in ["recommended_actions","alerts","forecasts","risk_assessments","commodity_prices","locations","commodities"]:
        op.drop_table(table)
