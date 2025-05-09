import {
    File,
    ListFilter,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"


export default function Customers() {
    return (
        <div className="flex w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <main className=" flex-1 items-start p-4 sm:px-6 sm:py-0 ">
                    <div className="auto-rows-max items-start ">
                        <div className="">
                            <Tabs defaultValue="week">
                                <div className="flex items-center">
                                    <TabsList>
                                        <TabsTrigger value="week">Week</TabsTrigger>
                                        <TabsTrigger value="month">Month</TabsTrigger>
                                        <TabsTrigger value="year">Year</TabsTrigger>
                                    </TabsList>
                                    <div className="ml-auto flex items-center gap-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-7 gap-1 text-sm"
                                                >
                                                    <ListFilter className="h-3.5 w-3.5" />
                                                    <span className="sr-only sm:not-sr-only">Filter</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuCheckboxItem checked>
                                                    Fulfilled
                                                </DropdownMenuCheckboxItem>
                                                <DropdownMenuCheckboxItem>
                                                    Declined
                                                </DropdownMenuCheckboxItem>
                                                <DropdownMenuCheckboxItem>
                                                    Refunded
                                                </DropdownMenuCheckboxItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-7 gap-1 text-sm"
                                        >
                                            <File className="h-3.5 w-3.5" />
                                            <span className="sr-only sm:not-sr-only">Export</span>
                                        </Button>
                                    </div>
                                </div>
                                <TabsContent value="week">
                                    <Card x-chunk="dashboard-05-chunk-3">
                                        <CardHeader className="px-7">
                                            <CardTitle>Customers</CardTitle>
                                            <CardDescription>
                                                Recent Customers from your store.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Customer</TableHead>
                                                        <TableHead className="hidden sm:table-cell">
                                                            Type
                                                        </TableHead>
                                                        <TableHead className="hidden sm:table-cell">
                                                            Status
                                                        </TableHead>
                                                        <TableHead className="hidden md:table-cell">
                                                            Date
                                                        </TableHead>
                                                        <TableHead className="text-right">Amount</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow className="bg-accent">
                                                        <TableCell>
                                                            <div className="font-medium">Liam Johnson</div>
                                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                                liam@example.com
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="hidden sm:table-cell">
                                                            Sale
                                                        </TableCell>
                                                        <TableCell className="hidden sm:table-cell">
                                                            <Badge className="text-xs" variant="secondary">
                                                                Fulfilled
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="hidden md:table-cell">
                                                            2023-06-23
                                                        </TableCell>
                                                        <TableCell className="text-right">$250.00</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <div className="font-medium">Olivia Smith</div>
                                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                                olivia@example.com
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="hidden sm:table-cell">
                                                            Refund
                                                        </TableCell>
                                                        <TableCell className="hidden sm:table-cell">
                                                            <Badge className="text-xs" variant="outline">
                                                                Declined
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="hidden md:table-cell">
                                                            2023-06-24
                                                        </TableCell>
                                                        <TableCell className="text-right">$150.00</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <div className="font-medium">Noah Williams</div>
                                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                                noah@example.com
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="hidden sm:table-cell">
                                                            Subscription
                                                        </TableCell>
                                                        <TableCell className="hidden sm:table-cell">
                                                            <Badge className="text-xs" variant="secondary">
                                                                Fulfilled
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="hidden md:table-cell">
                                                            2023-06-25
                                                        </TableCell>
                                                        <TableCell className="text-right">$350.00</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <div className="font-medium">Emma Brown</div>
                                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                                emma@example.com
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="hidden sm:table-cell">
                                                            Sale
                                                        </TableCell>
                                                        <TableCell className="hidden sm:table-cell">
                                                            <Badge className="text-xs" variant="secondary">
                                                                Fulfilled
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="hidden md:table-cell">
                                                            2023-06-26
                                                        </TableCell>
                                                        <TableCell className="text-right">$450.00</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <div className="font-medium">Liam Johnson</div>
                                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                                liam@example.com
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="hidden sm:table-cell">
                                                            Sale
                                                        </TableCell>
                                                        <TableCell className="hidden sm:table-cell">
                                                            <Badge className="text-xs" variant="secondary">
                                                                Fulfilled
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="hidden md:table-cell">
                                                            2023-06-23
                                                        </TableCell>
                                                        <TableCell className="text-right">$250.00</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <div className="font-medium">Liam Johnson</div>
                                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                                liam@example.com
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="hidden sm:table-cell">
                                                            Sale
                                                        </TableCell>
                                                        <TableCell className="hidden sm:table-cell">
                                                            <Badge className="text-xs" variant="secondary">
                                                                Fulfilled
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="hidden md:table-cell">
                                                            2023-06-23
                                                        </TableCell>
                                                        <TableCell className="text-right">$250.00</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <div className="font-medium">Olivia Smith</div>
                                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                                olivia@example.com
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="hidden sm:table-cell">
                                                            Refund
                                                        </TableCell>
                                                        <TableCell className="hidden sm:table-cell">
                                                            <Badge className="text-xs" variant="outline">
                                                                Declined
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="hidden md:table-cell">
                                                            2023-06-24
                                                        </TableCell>
                                                        <TableCell className="text-right">$150.00</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <div className="font-medium">Emma Brown</div>
                                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                                emma@example.com
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="hidden sm:table-cell">
                                                            Sale
                                                        </TableCell>
                                                        <TableCell className="hidden sm:table-cell">
                                                            <Badge className="text-xs" variant="secondary">
                                                                Fulfilled
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="hidden md:table-cell">
                                                            2023-06-26
                                                        </TableCell>
                                                        <TableCell className="text-right">$450.00</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}