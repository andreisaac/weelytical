import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "React Docs",
  description: "Instructions to implement weelytical-react component.",
};


const ReactDoc = () => {
  return (
    <div className='flex flex-col max-md:text-sm xl:text-lg break-all'>
      <h3 className='mt-4 text-2xl xl:text-4xl'>React JS</h3>
      
      <p className='mt-2 xl:mt-8 text-lg xl:text-xl'>First you need to install the weelytical-react package.</p>

      <div className="mockup-code mt-8 max-lg:max-w-[97%]">
        <pre data-prefix="$"><code>npm i weelytical-react -s</code></pre>
      </div>

      <p className='mt-8 text-lg xl:text-xl'>Import the component and place it in your app root file or layout.</p>

      <div className="mockup-code mt-8 break-all">
        <pre>{"import Weelytical from \"weelytical-react\";"}</pre>
        <pre>
        <pre className="break-all">{"const RootLayout = ({children }) => { "}</pre>
          <pre><code className='pl-4'>{"return ("}</code></pre>
            <pre><code className='pl-4'> {"<html>"} </code></pre>
              <pre><code className='pl-10'>{"<body>"}</code></pre>
                <pre><code className='pl-14'>{"<Weelytical/>"}</code></pre>
                <pre><code className='pl-14'>{"{children}"}</code></pre>
              <pre><code className='pl-10'>{"</body>"}</code></pre>
            <pre><code className='pl-4'> {"</html>"} </code></pre>
        <pre>{");}"}</pre>
      </pre>
      </div>

      <p className='mt-4 xl:mt-10 text-xl'>{"You're all set up! Go to your dashboard to analyse your traffic!"}</p>
    </div>
  );
}

export default ReactDoc;