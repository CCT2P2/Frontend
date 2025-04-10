"use client";
import { Card } from "@/components/ui/card";

const orange = "#fc6e22";
const blue = "#5382a1";
const yellow = "#ffff66";
const purple = "#c24cf6";
const green = "#78fe8b";

function hexToAlpha(hex: string, alpha: number): string {
  const [r, g, b] = hex.match(/\w\w/g)!.map((x) => parseInt(x, 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function HomeForumList() {
  return (
    <div className="h-screen flex flex-col gap-3">
      <Card className="border-secondary gap-3 overflow-y-auto max-h-[80%]">
        <Card
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha(orange, 0.2))
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
          style={{ borderColor: orange }}
          className={`border-[${orange}] py-3 transition-colors duration-200`}
        >
          Rust
        </Card>
        <Card
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha(blue, 0.2))
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
          style={{ borderColor: blue }}
          className={`border-[${blue}] py-3 transition-colors duration-200`}
        >
          Python
        </Card>
        <Card
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha(yellow, 0.2))
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
          style={{ borderColor: yellow }}
          className={`border-[${yellow}] py-3 transition-colors duration-200`}
        >
          JavaScript
        </Card>
        <Card
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha(purple, 0.2))
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
          style={{ borderColor: purple }}
          className={`border-[${purple}] py-3 transition-colors duration-200`}
        >
          C#
        </Card>
        <Card
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha(green, 0.2))
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
          style={{ borderColor: green }}
          className={`border-[${green}] py-3 transition-colors duration-200`}
        >
          Nim
        </Card>
      </Card>
    </div>
  );
}
