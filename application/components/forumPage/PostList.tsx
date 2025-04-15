"use client";

import { Card } from "@/components/ui/card";
import PostThumbnail from "@/components/general/postThumbnail";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SortingMenu from "@/components/general/sortingMenu";
import CreatePost from "@/components/general/createPost";

export default function PostList() {
  return (
    <Card className={`grow relative light-glow-primary col-span-3`}>
      <Tabs defaultValue="home" className={`px-10 py-6 gap-4`}>
        <TabsList className={`w-full bg-black/50`}>
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
        </TabsList>
        <div className="flex items-center justify-between">
          <SortingMenu />
          <CreatePost />
        </div>
        <TabsContent value={"home"}>
          <div className={"flex flex-col gap-8"}>
            <PostThumbnail
              postTitle={"Why C# is good"}
              postContent={
                "C# is a powerful and versatile programming language that is widely used in the development of enterprise applications, web applications, and mobile applications. It is known for its strong typing, object-oriented programming, and support for modern programming paradigms such as functional programming and reactive programming. C# is also integrated with the .NET framework, which provides a rich set of libraries and tools for building scalable and secure applications."
              }
              community={"C#"}
              author={"literally_a_cat"}
              votes={20}
              comments={3}
            />
            <PostThumbnail
              postTitle={"why C# sucks"}
              postContent={
                "C# is a powerful and versatile programming language that is widely used in the development of enterprise applications, web applications, and mobile applications. It is known for its strong typing, object-oriented programming, and support for modern programming paradigms such as functional programming and reactive programming. C# is also integrated with the .NET framework, which provides a rich set of libraries and tools for building scalable and secure applications."
              }
              community={"C#"}
              author={"literally_a_cat"}
              votes={16}
              comments={12}
            />
            <PostThumbnail
              postTitle={"how to make big dick in C#"}
              postContent={"title says it all really"}
              community={"C#"}
              author={"literally_a_cat"}
              votes={78}
              comments={15}
            />
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
