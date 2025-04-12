import { Card, CardTitle } from "@/components/ui/card";
import { useUISettings } from "@/app/store/useUISettings";

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
  const { padding, paddingButton } = useUISettings();
  return (
    <div>
      <Card className={`${backgroundColor} backdrop-blur-md p-${padding}`}>
        <CardTitle className={``}>Home</CardTitle>
        <div className={`p-${paddingButton}`}>
          Your personal place to chill with familiar posts, or discover brand
          new content
        </div>
      </Card>
    </div>
  );
}
export function HomeForumTagsPanel({
  backgroundColor,
}: {
  backgroundColor: string;
}) {
  const { padding, paddingButton } = useUISettings();
  return (
    <div>
      <Card className={`my-5 ${backgroundColor} backdrop-blur-md p-${padding}`}>
        <CardTitle className={``}>Tags</CardTitle>
        <div className={`p-${paddingButton}`}>
          Only wanna see content from a specific tag?
        </div>
        <div className={`flex flex-wrap gap-3 `}>
          <Card
            className={`border-[${orange}] w-[40%] p-${paddingButton} hover:bg-primary/20 transition-colors duration-200 ${backgroundColor}`}
          >
            Rust
          </Card>
          <Card
            className={`border-[${blue}] p-${paddingButton} w-[70%] hover:bg-primary/20 transition-colors duration-200 ${backgroundColor}`}
          >
            Python
          </Card>
          <Card
            className={`border-[${yellow}] p-${paddingButton} w-[60%] hover:bg-primary/20 transition-colors duration-200 ${backgroundColor}`}
          >
            JavaScript
          </Card>
          <Card
            className={`border-[${purple}] p-${paddingButton} w-[30%] hover:bg-primary/20 transition-colors duration-200 ${backgroundColor}`}
          >
            C#
          </Card>
          <Card
            className={`border-[${green}] p-${paddingButton} w-[40%] hover:bg-primary/20 transition-colors duration-200 ${backgroundColor}`}
          >
            Nim
          </Card>
        </div>
      </Card>
    </div>
  );
}
