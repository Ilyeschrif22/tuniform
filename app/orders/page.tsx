"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchOrders, createOrder } from "@/lib/api";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        const formattedData = data.map((order: any) => ({
          ...order,
          createdAt: new Date(order.createdAt).toISOString().split("T")[0],
        }));
        setOrders(formattedData);
        console.log(formattedData);
      } catch (error) {
        setError("Failed to load orders. Please try again.");
      }
    };
    loadOrders();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await createOrder({ customerName, email });
      const newOrders = await fetchOrders();
      // Format createdAt for new orders
      const formattedNewOrders = newOrders.map((order: any) => ({
        ...order,
        createdAt: new Date(order.createdAt).toISOString().split("T")[0],
      }));
      setOrders(formattedNewOrders);
      setCustomerName("");
      setEmail("");
      setIsModalOpen(false);
      router.refresh();
    } catch (error: any) {
      setError(error.message || "Failed to create order. Please try again.");
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]:h-12">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>

          <div className="flex-1" />

          <div>
            <ModeToggle />
          </div>
        </header>

        <div className="px-4 py-2 m-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/orders">Orders</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex justify-end">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
                >
                  Add New Order
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] shadow-lg">
                <DialogHeader>
                  <DialogTitle>Create New Order</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Customer Name</Label>
                    <Input
                      id="customerName"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      placeholder="Enter customer name"
                      className="border-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter email"
                      className="border-input"
                    />
                  </div>
                  {error && <p className="text-destructive text-sm">{error}</p>}
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Submit Order</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={orders} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}