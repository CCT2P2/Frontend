import HomePostList from "@/components/homePage/homePostList";
import HomeForumList from "@/components/homePage/homeForumList";
export default function Home() {
  return (
    <div>
      <div className="mx-10 my-5 flex">
        <div className="sticky top-6 h-full">
          <HomeForumList />
        </div>
        <div className="mr-6"></div>
        <HomePostList />
        <div className={"w-2/14 flex mx-6"}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          pretium arcu ac vehicula varius. Duis in mi sollicitudin nulla commodo
          suscipit. Sed ex odio, hendrerit eu hendrerit sit amet, lacinia
          elementum sem. Sed volutpat vehicula porttitor. Donec ornare
          sollicitudin congue. Pellentesque diam augue, vehicula nec dolor id,
          tincidunt volutpat odio. Nam facilisis metus augue. Pellentesque
          bibendum mollis sem, pharetra viverra ligula rhoncus eleifend.
          Curabitur iaculis odio dolor, eu dignissim tortor molestie ut. Sed
          pretium ligula porta, iaculis tellus sit amet, bibendum augue. Aliquam
          pulvinar fermentum lobortis. Cras semper dolor ipsum, imperdiet
          euismod mauris luctus id. Vestibulum pretium semper nunc vitae dictum.
          Sed aliquet luctus ipsum, sed pulvinar nulla convallis sed. Morbi
          dolor felis, ornare a nibh sit amet, porta luctus odio. Vivamus mattis
          ante eget nisi condimentum, vel condimentum nunc iaculis. Proin sed
          felis scelerisque, sollicitudin odio eget, commodo magna. Proin
          hendrerit cursus lacinia. Quisque varius sit amet massa maximus
          dictum. Orci varius natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus. Mauris ultricies justo purus, et luctus massa
          imperdiet sit amet. Aenean ante quam, aliquam ut risus et, vestibulum
          sagittis nulla. Ut iaculis tellus enim, non dignissim elit placerat a.
          Quisque imperdiet sagittis consectetur. Suspendisse et tincidunt
          turpis. Ut pulvinar, urna ac auctor consequat, nisl nisi porttitor
          elit, non molestie ipsum arcu eget libero. Duis commodo suscipit leo,
          ac feugiat nunc pulvinar eget. Maecenas non orci lacus. In sed est
          tortor. Donec sed augue lacus. Curabitur feugiat egestas dictum.
          Maecenas sem est, euismod vitae vulputate eu, pharetra quis odio.
          Mauris fringilla suscipit blandit. Aenean quis accumsan lorem. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet
          vehicula mauris, at dignissim ex. Suspendisse potenti. Aenean
          venenatis mi vel augue ultricies facilisis. Nullam vel ligula in urna
          blandit lacinia. Duis nec sem elementum, aliquet nibh quis, sodales
          erat. Aenean dictum consequat mi ac feugiat. Nam id eros ultrices,
          consectetur felis quis, mollis mauris. Phasellus blandit est quis
          ipsum porttitor, ut dictum quam finibus. Suspendisse convallis vitae
          sapien ut pharetra. Praesent varius tincidunt enim, vel pulvinar dolor
          venenatis imperdiet. Maecenas convallis, ipsum sit amet tempus
          aliquam, ligula nibh consequat neque, eget ullamcorper diam mauris ut
          ex. Curabitur auctor euismod massa, sit amet aliquet augue blandit
          eget. Proin suscipit dolor quis pellentesque bibendum. Etiam eleifend
          tincidunt mi, id cursus neque porttitor convallis. Cras ultricies
          convallis dui id vulputate. Nulla facilisi. Curabitur ac est luctus,
          interdum mi a, auctor leo. Quisque posuere diam nec lacinia vulputate.
          Pellentesque viverra mi et gravida tincidunt. Cras vulputate, urna eu
          consectetur porttitor, felis lacus sollicitudin justo, eu fermentum
          nisi arcu ac enim. Interdum et malesuada fames ac ante ipsum primis in
          faucibus. Phasellus sit amet semper leo. Nullam ut eleifend dolor.
          Pellentesque sapien ex, egestas id ornare ac, maximus sed neque. Proin
          pretium aliquet blandit. Proin in lectus ultricies, auctor dolor ut,
          dapibus leo. Mauris dapibus consequat ornare. Ut iaculis, tortor vel
          interdum blandit, lorem purus rhoncus risus, sit amet pretium erat
          ante egestas est. Sed ornare, nunc non molestie bibendum, augue leo
          feugiat urna, vitae feugiat elit sem sed enim.
        </div>
      </div>
    </div>
  );
}
