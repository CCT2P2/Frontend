import { Card, CardTitle } from "@/components/ui/card";

const orange = "#fc6e22";
const blue = "#5382a1";
const yellow = "#ffff66";
const purple = "#c24cf6";
const green = "#78fe8b";

export function HomeForumName({
  backgroundColor,
}: {
  backgroundColor: string;
}) {
  return (
    <div>
      <Card className={`${backgroundColor} backdrop-blur-md`}>
        <CardTitle>Home</CardTitle>
        <h1>
          Your personal place to chill with familiar posts, or discover brand
          new content
        </h1>
      </Card>
    </div>
  );
}
export function HomeForumTagsPanel({
  backgroundColor,
}: {
  backgroundColor: string;
}) {
  return (
    <div>
      <Card className={`my-6 ${backgroundColor} backdrop-blur-md`}>
        <CardTitle>Tags</CardTitle>
        Only wanna see content from a specific tag?
        <div className="flex flex-wrap gap-3">
          <Card
            className={`border-[${orange}] w-[40%] py-3 hover:bg-primary/20 transition-colors duration-200 ${backgroundColor}`}
          >
            Rust
          </Card>
          <Card
            className={`border-[${blue}] py-3 w-[70%] hover:bg-primary/20 transition-colors duration-200 ${backgroundColor}`}
          >
            Python
          </Card>
          <Card
            className={`border-[${yellow}] py-3 w-[60%] hover:bg-primary/20 transition-colors duration-200 ${backgroundColor}`}
          >
            JavaScript
          </Card>
          <Card
            className={`border-[${purple}] py-3 w-[30%] hover:bg-primary/20 transition-colors duration-200 ${backgroundColor}`}
          >
            C#
          </Card>
          <Card
            className={`border-[${green}] py-3 w-[40%] hover:bg-primary/20 transition-colors duration-200 ${backgroundColor}`}
          >
            Nim
          </Card>
        </div>
      </Card>
    </div>
  );
}
