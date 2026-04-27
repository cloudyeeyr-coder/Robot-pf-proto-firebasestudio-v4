"use client"

import React from 'react';
import { 
  Factory, 
  History, 
  Package, 
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export function ManufacturerDashboard() {
  const orders = [
    { id: 'ORD-001', client: 'Global Systems Inc', product: 'Control Panel v2', status: 'In Production', progress: 65 },
    { id: 'ORD-002', client: 'TechFlow Ltd', product: 'Sensor Module X', status: 'Quality Check', progress: 90 },
    { id: 'ORD-003', client: 'BuildWise Co', product: 'Heavy Duty Motor', status: 'Pending', progress: 5 },
    { id: 'ORD-004', client: 'Nexus Energy', product: 'Power Converter', status: 'Delayed', progress: 40 },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Production</CardTitle>
            <Factory className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 Lines</div>
            <p className="text-xs text-muted-foreground mt-1">92% efficiency rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Inventory Health</CardTitle>
            <Package className="size-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Optimal</div>
            <p className="text-xs text-muted-foreground mt-1">4 SKUs low on stock</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Service Requests</CardTitle>
            <History className="size-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8 Pending</div>
            <p className="text-xs text-muted-foreground mt-1">Avg response: 4.2h</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Production Queue</CardTitle>
            <CardDescription>Real-time status of current manufacturing orders.</CardDescription>
          </div>
          <Button variant="outline" size="sm">View Full Schedule</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs">{order.id}</TableCell>
                  <TableCell className="font-medium">{order.client}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell className="min-w-[140px]">
                    <div className="flex items-center gap-2">
                      <Progress value={order.progress} className="h-2" />
                      <span className="text-[10px] font-bold">{order.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      order.status === 'In Production' ? 'default' :
                      order.status === 'Quality Check' ? 'secondary' :
                      order.status === 'Delayed' ? 'destructive' : 'outline'
                    }>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon"><ArrowRight className="size-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}