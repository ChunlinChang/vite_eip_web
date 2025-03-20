import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "../Profile.jsx";
import Callback from "../Callback";
import Login from "../Loginerror.jsx";

import { useNavigate } from "react-router-dom";
import { login, logout, getUserInfo } from "../../auth";

import {
  InstagramIcon,
  LinkedinIcon,
  MenuIcon,
  TwitterIcon,
  XIcon,
  YoutubeIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import { Separator } from "../../components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import { Switch } from "../../components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";




export const EipIndex = () => {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo().then(setUser);
  }, []);

  // 控制側邊抽屜的狀態
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 切換側邊抽屜的顯示狀態
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { id: "manual", label: "使用手冊" },
    { id: "darkmode", label: "暗黑模式", hasSwitch: true },
    { id: "settings", label: "設定" },
  ];

  // News data for accordion
  const newsItems = [
    {
      id: "item-1",
      title: "Title",
      content:
        "Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.",
    },
    {
      id: "item-2",
      title: "hello",
      content: "00111122222222222222211110",
    },
    {
      id: "item-3",
      title: "Title",
      content: "",
    },
    {
      id: "item-4",
      title: "Title",
      content: "",
    },
    {
      id: "item-5",
      title: "Title",
      content: "",
    },
  ];

  const systemEntries = [
    {
      id: "sys-1",
      title: "高科校務行政資訊系統",
      url: "https://webap.nkust.edu.tw/nkust/",
    },
    {
      id: "sys-2",
      title: "請購系統",
      url: "https://account02.nkust.edu.tw/",
    },
    {
      id: "sys-3",
      title: "非政府產學計畫管理系統",
      url: "https://ws3.nkust.edu.tw/ProjectIAC/Account/Login?ReturnUrl=%2FProjectIAC%2FWorkflow%2FMain",
    },
  ];


  // Footer links data
  const footerSections = [
    {
      title: "Use cases",
      links: ["UI design", "Wireframing"],
    },
    {
      title: "Resources",
      links: ["Blog", "Support"],
    },
  ];

  return (
    <div className="flex flex-col items-start relative bg-[#3a6ba5] min-h-screen">
      <header className="flex items-center justify-between px-3.5 py-6 relative w-full bg-white border-b border-[#d9d9d9]">
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full hover:scale-110 transition-transform duration-150">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-[293px] p-0">
            {/* 渲染 menuItems */}
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 rounded-md cursor-pointer">
                  <span className="text-lg">{item.label}</span>
                  {item.hasSwitch && <Switch />}
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>

        <div className="flex items-center w-full max-w-xl px-4 py-3 relative bg-white rounded-full border border-solid border-[#d9d9d9]">
          <Input className="flex-1 bg-transparent font-single-line-body-base text-[#1e1e1e] border-0 p-0" placeholder="搜尋" />
          <XIcon className="w-4 h-4 cursor-pointer ml-2" />
        </div>

        {user ? (
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://c.animaapp.com/m87e0cjjZocDOr/img/shape.png" alt="User avatar" onClick={() => navigate("/profile")} />
              <AvatarFallback>{user.username ? user.username[0].toUpperCase() : "U"}</AvatarFallback>
            </Avatar>
            <Button onClick={logout}>登出</Button>
          </div>
        ) : (
          <Button onClick={login}>登入</Button>
        )}
      </header>

      <div className="flex flex-col items-center justify-center px-4 py-2 relative w-full">
        <div className="items-center relative inline-flex flex-col gap-2">
          <h1 className="font-bold text-white text-2xl text-center tracking-[-0.48px] leading-[28.8px] font-['Inter',Helvetica]">
            高科EIP入口網站
          </h1>
        </div>
      </div>

      <Card className="w-full rounded-[16px_20px_20px_20px] border-0">
        <CardContent className="p-0">
          <div className="pt-0 p-4">
            <div className="mb-1 p-5 border border-solid border-[#d9d9d9] rounded-lg bg-white mt-0">
              <h2 className="font-semibold tracking-[-0.32px] leading-[19.2px] font-['Inter',Helvetica] text-[#1e1e1e] text-base">
                最新消息
              </h2>

              <ScrollArea className="h-[290px] w-full pr-2 bg-white overflow-y-auto rounded-lg mt-5">
                <Accordion type="single" collapsible className="w-full">
                  {newsItems.map((item) => (
                    <AccordionItem
                      key={item.id}
                      value={item.id}
                      className="mb-4 border border-solid border-[#d9d9d9] rounded-lg overflow-hidden"
                    >
                      <AccordionTrigger className="px-4 py-3 font-body-strong text-[#1e1e1e]">
                        {item.title}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-0 font-body-base text-[#1e1e1e]">
                        {item.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </div>
          </div>
        </CardContent>
      </Card>


      <Tabs defaultValue="系統入口" className="w-full">
        <TabsList className="w-full grid grid-cols-4 bg-neutral-100 rounded-none h-auto">
          <TabsTrigger
            value="首頁"
            className="text-m3syslighton-surface-variant font-m3-title-small data-[state=active]:text-[#3a6ba5] data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:w-full data-[state=active]:after:h-[3px] data-[state=active]:after:bg-[#3a6ba5] data-[state=active]:after:rounded-t-full relative py-3.5"
          >
            首頁
          </TabsTrigger>
          <TabsTrigger
            value="打卡"
            className="text-m3syslighton-surface-variant font-m3-title-small data-[state=active]:text-[#3a6ba5] data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:w-full data-[state=active]:after:h-[3px] data-[state=active]:after:bg-[#3a6ba5] data-[state=active]:after:rounded-t-full relative py-3.5"
          >
            打卡
          </TabsTrigger>
          <TabsTrigger
            value="系統入口"
            className="text-m3syslighton-surface-variant font-m3-title-small data-[state=active]:text-[#3a6ba5] data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:w-full data-[state=active]:after:h-[3px] data-[state=active]:after:bg-[#3a6ba5] data-[state=active]:after:rounded-t-full relative py-3.5"
          >
            系統入口
          </TabsTrigger>
          <TabsTrigger
            value="行事曆"
            className="text-m3syslighton-surface-variant font-m3-title-small data-[state=active]:text-[#3a6ba5] data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:w-full data-[state=active]:after:h-[3px] data-[state=active]:after:bg-[#3a6ba5] data-[state=active]:after:rounded-t-full relative py-3.5"
          >
            行事曆
          </TabsTrigger>
        </TabsList>
        <Separator />

        <TabsContent value="系統入口" className="mt-0">
          <div className="bg-[#3d70ac] rounded-[5px] w-full">
            {systemEntries.map((system, index) => (
              <a
                key={system.id}
                href={system.url} // 直接從 system 物件獲取對應的 URL
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <div className="flex items-center px-4 py-2 h-14 cursor-pointer hover:bg-[#3b6ba6]">
                  <div className="text-white font-m3-body-large">
                    {system.title}
                  </div>
                </div>
                {index < systemEntries.length - 1 && (
                  <Separator className="bg-white" />
                )}
              </a>
            ))}
          </div>
        </TabsContent>

      </Tabs>

      <footer className="flex flex-col items-start gap-16 p-8 w-full bg-white border-t border-[#d9d9d9] mt-auto">
        <div className="flex items-center justify-around gap-4 w-full">
          <div className="inline-flex items-center gap-4">
            <TwitterIcon className="w-6 h-6" />
            <InstagramIcon className="w-6 h-6" />
            <YoutubeIcon className="w-6 h-6" />
            <LinkedinIcon className="w-6 h-6" />
          </div>
        </div>

        <div className="flex flex-col items-start gap-6 w-full">
          {footerSections.map((section, index) => (
            <div key={index} className="flex flex-col items-start gap-2 w-full">
              <div className="flex flex-col items-start gap-2.5 pt-0 pb-1 px-0 w-full">
                <h3 className="font-bold tracking-[0] leading-[22.4px] font-['Inter',Helvetica] text-[#1e1e1e] text-base">
                  {section.title}
                </h3>
              </div>

              {section.links.map((link, linkIndex) => (
                <div key={linkIndex} className="w-full h-[22px]">
                  <div className="font-body-base text-[#1e1e1e]">{link}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default EipIndex;

