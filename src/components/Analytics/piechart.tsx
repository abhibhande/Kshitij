
import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { ChevronRight } from "lucide-react"
const chartData = [
  { status: "pending", progress: 275, fill: "var(--color-pending)" },
  { status: "inprogress", progress: 200, fill: "var(--color-inprogress)" },
  { status: "completed", progress: 287, fill: "var(--color-completed)" },
]

const chartConfig = {
  progress: {
    label: "Progress",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-1))",
  },
  inprogress: {
    label: "In-Progress",
    color: "hsl(var(--chart-4))",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-2))",
  }
} satisfies ChartConfig

export function Component() {
  const totalProgress = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.progress, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="progress"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalProgress.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Progress
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
       <CardFooter>
       <div className="grid grid-cols-3 gap-1 ">
  <Badge className="bg-orange-600">Pending</Badge>
  <Badge className="bg-yellow-500">Pending</Badge>
  <Badge className="bg-teal-600">Pending</Badge>
  
  <Button variant={"outline"} className="col-span-3 ml-auto text-right mt-3">
    View Details <ChevronRight/>
  </Button>
</div>

       
       </CardFooter>
      </CardContent>
    </Card>
  )
}
