import Image from 'next/image';
import Link from 'next/link';

const ReactDoc = () => {
  return (
    <div className='flex flex-col text-lg'>
      <h3 className='mt-4 text-4xl'>React JS</h3>
      
      <p className='mt-8 text-xl'>First you need to install the package that contains the component.</p>

      <div className="mockup-code mt-8">
        <pre data-prefix="$"><code>npm i weelytical-react -s</code></pre>
      </div>

      <p className='mt-8 text-xl'>.</p>
    </div>
  );
}

export default ReactDoc;