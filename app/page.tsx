import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link"
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Home() {
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
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex flex-1 flex-col gap-6 p-6 pt-0 max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/logo.png"
              alt="Tuniform Logo"
              height={60}
              width={140}
              className="w-auto object-contain"
            />
            <h1 className="text-4xl font-bold tracking-tight text-emerald-400">
              Welcome to Tuniform
            </h1>
          </div>
          <p className="text-lg text-gray-500 dark:text-gray-400 text-center">
            Explore our platform to build and manage your applications with
            ease.
          </p>
            
          <div className="flex justify-center"></div>
            <div className="flex justify-center animate-fade-in delay-300">
            <Link
              href="/dashboard"
              className="inline-flex items-center px-8 py-3 bg-emerald-500 text-white font-semibold rounded-full hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
