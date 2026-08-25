import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { RecommendedAction } from "@/types/alert";

export function RecommendationCard({ action }: { action: RecommendedAction }) {
  return (
    <Card className="rounded-lg">
      <CardHeader className="border-b">
        <CardTitle>Recommended government actions</CardTitle>
        <CardDescription>
          Options for authorised officers to consider. This is decision support,
          not an automatic order.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="list-decimal space-y-2 pl-4 text-sm leading-relaxed">
          {action.actions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </CardContent>
      <CardFooter>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {action.disclaimer}
        </p>
      </CardFooter>
    </Card>
  );
}
