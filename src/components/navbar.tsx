import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/src/config/site";
import { ThemeSwitch } from "@/src/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/src/components/icons";

export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: " bg-default-200  px-3 shadow-sm",
        input: "text-sm text-default-800 w-96",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-lg text-default-600 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar maxWidth="full" position="sticky">
      {/* Left Section */}
      <NavbarContent className=" sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex items-center gap-2" href="/">
            <Logo />
            <p className="font-extrabold text-lg">ACME</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Center/Search Section */}
      <NavbarContent className="hidden sm:flex  sm:basis-full" justify="center">
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
      </NavbarContent>

      {/* Right Section */}
      <NavbarContent className="hidden sm:flex  sm:basis-full" justify="end">
        <NavbarItem className="flex items-center gap-3">
          <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-300" />
          </Link>
          <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-300" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-300" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-full px-4 py-2 transition duration-200"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-white" />}
            variant="flat"
          >
            Sponsor
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Section */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-300" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Navbar Menu */}
      <NavbarMenu className="bg-gradient-to-br from-gray-800 to-gray-900 text-white">
        {searchInput}
        <div className="mx-4 mt-4 flex flex-col gap-3">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className={clsx(
                  "text-lg",
                  index === 2
                    ? "text-primary hover:text-yellow-400"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "text-danger hover:text-red-400"
                      : "text-foreground hover:text-yellow-400",
                )}
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
