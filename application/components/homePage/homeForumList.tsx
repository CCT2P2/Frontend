"use client";
import { Card, CardTitle } from "@/components/ui/card";

const orange = "#fc6e22";
const blue = "#5382a1";
const yellow = "#ffff66";

function hexToAlpha(hex: string, alpha: number): string {
  const [r, g, b] = hex.match(/\w\w/g)!.map((x) => parseInt(x, 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function HomeForumList({
  backgroundColor,
}: {
  backgroundColor: string;
}) {
  return (
    <div className="h-screen flex flex-col gap-1">
      <Card
        className="border-secondary gap-3 overflow-y-auto max-h-[80%] backdrop-blur-md"
        style={{ backgroundColor }}
      >
        <CardTitle>Forums</CardTitle>
        <Card
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha(orange, 0.2))
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha("#d1d5db", 0.1))
          }
          style={{ borderColor: orange, backgroundColor }}
          className="py-3 transition-colors duration-200"
        >
          Whyy
        </Card>
        <Card
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha(blue, 0.2))
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha("#d1d5db", 0.1))
          }
          style={{ borderColor: blue, backgroundColor }}
          className="py-3 transition-colors duration-200"
        >
          BigQuestions
        </Card>
        <Card
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha(yellow, 0.2))
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha("#d1d5db", 0.1))
          }
          style={{ borderColor: yellow, backgroundColor }}
          className="py-3 transition-colors duration-200"
        >
          wowsers
        </Card>{" "}
        <Card
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha(orange, 0.2))
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha("#d1d5db", 0.1))
          }
          style={{ borderColor: orange, backgroundColor }}
          className="py-3 transition-colors duration-200"
        >
          Whyy
        </Card>
        <Card
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha(blue, 0.2))
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha("#d1d5db", 0.1))
          }
          style={{ borderColor: blue, backgroundColor }}
          className="py-3 transition-colors duration-200"
        >
          BigQuestions
        </Card>
        <Card
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha(yellow, 0.2))
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha("#d1d5db", 0.1))
          }
          style={{ borderColor: yellow, backgroundColor }}
          className="py-3 transition-colors duration-200"
        >
          wowsers
        </Card>{" "}
        <Card
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha(orange, 0.2))
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha("#d1d5db", 0.1))
          }
          style={{ borderColor: orange, backgroundColor }}
          className="py-3 transition-colors duration-200"
        >
          Whyy
        </Card>
        <Card
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha(blue, 0.2))
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha("#d1d5db", 0.1))
          }
          style={{ borderColor: blue, backgroundColor }}
          className="py-3 transition-colors duration-200"
        >
          BigQuestions
        </Card>
        <Card
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha(yellow, 0.2))
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha("#d1d5db", 0.1))
          }
          style={{ borderColor: yellow, backgroundColor }}
          className="py-3 transition-colors duration-200"
        >
          wowsers
        </Card>{" "}
        <Card
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha(orange, 0.2))
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha("#d1d5db", 0.1))
          }
          style={{ borderColor: orange, backgroundColor }}
          className="py-3 transition-colors duration-200"
        >
          Whyy
        </Card>
        <Card
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha(blue, 0.2))
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha("#d1d5db", 0.1))
          }
          style={{ borderColor: blue, backgroundColor }}
          className="py-3 transition-colors duration-200"
        >
          BigQuestions
        </Card>
        <Card
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha(yellow, 0.2))
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha("#d1d5db", 0.1))
          }
          style={{ borderColor: yellow, backgroundColor }}
          className="py-3 transition-colors duration-200"
        >
          wowsers
        </Card>{" "}
        <Card
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha(orange, 0.2))
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha("#d1d5db", 0.1))
          }
          style={{ borderColor: orange, backgroundColor }}
          className="py-3 transition-colors duration-200"
        >
          Whyy
        </Card>
        <Card
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha(blue, 0.2))
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha("#d1d5db", 0.1))
          }
          style={{ borderColor: blue, backgroundColor }}
          className="py-3 transition-colors duration-200"
        >
          BigQuestions
        </Card>
        <Card
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha(yellow, 0.2))
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha("#d1d5db", 0.1))
          }
          style={{ borderColor: yellow, backgroundColor }}
          className="py-3 transition-colors duration-200"
        >
          wowsers
        </Card>{" "}
        <Card
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha(orange, 0.2))
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha("#d1d5db", 0.1))
          }
          style={{ borderColor: orange, backgroundColor }}
          className="py-3 transition-colors duration-200"
        >
          Whyy
        </Card>
        <Card
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha(blue, 0.2))
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha("#d1d5db", 0.1))
          }
          style={{ borderColor: blue, backgroundColor }}
          className="py-3 transition-colors duration-200"
        >
          BigQuestions
        </Card>
        <Card
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha(yellow, 0.2))
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = hexToAlpha("#d1d5db", 0.1))
          }
          style={{ borderColor: yellow, backgroundColor }}
          className="py-3 transition-colors duration-200"
        >
          wowsers
        </Card>
      </Card>
    </div>
  );
}
