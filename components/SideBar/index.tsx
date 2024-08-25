"use client";
import Link from "next/link";
import Image from "next/image";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Footer from "../Footer";

const SideBar = ({ user }: SiderbarProps) => {
  const pathName = usePathname();
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            className="size-[24px] max-xl:size-14"
            alt="logo"
          />
          <h1 className="sidebar-logo">Bank</h1>
        </Link>
        {sidebarLinks.map((link) => {
          const isActive =
            pathName === link.route || pathName.startsWith(`${link.route}/`);
          return (
            <Link
              key={link.label}
              href={link.route}
              className={cn("sidebar-link", { "bg-bank-gradient": isActive })}
            >
              <div className="relative size-6">
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  fill
                  className={cn({ "brightness-[3] invert-0": isActive })}
                />
              </div>
              <p className={cn("sidebar-label", { "!text-white": isActive })}>
                {link.label}
              </p>
            </Link>
          );
        })}
        {/* //TODO: Add user data */}
      </nav>
      <Footer user={user} />
    </section>
  );
};

export default SideBar;
