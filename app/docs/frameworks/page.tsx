import Image from 'next/image';
import Link from 'next/link';
import react from "@images/react.svg";
import error from "@images/error.svg";
import checkCircle from "@images/checkCircle.svg";
import js from "@images/js.svg";
import vue from "@images/vue.svg";
import angular from "@images/angular.svg";

const Frameworks = () => {
  return (
    <div className='flex flex-col text-lg'>
      <h3 className='mt-4 text-4xl'>Pick your framework</h3>

      <h4 className='mt-8 text-2xl'>Currently we only offer a React version of Weelytical, soon will be released a plain javascript version.</h4>

      <h3 className='mt-8 text-3xl'>Available frameworks / languages:</h3>

      <div className='grid grid-rows-4 grid-flow-col gap-2 mt-4 text-2xl'>
        <div>
          <Link href="/docs/react" className='pl-10'>
            <Image src={checkCircle} alt="react logo" width={35} className='h-auto mr-4 inline'/> 
            <Image src={react} alt="react logo" width={50} className='h-auto mr-4 inline'/> 
            <p className='mt-[6px] inline'>React</p>
          </Link>
        </div>

        <div>
          <Link href="" className='pl-10'>
            <Image src={error} alt="react logo" width={30} className='h-auto mr-4 inline'/> 
            <Image src={js} alt="react logo" width={50} className='h-auto mr-4 inline'/> 
            <p className='mt-[6px] inline'>Javascript</p>
          </Link>
        </div>
        
        <div>
          <Link href="" className='pl-10'>
            <Image src={error} alt="react logo" width={30} className='h-auto mr-4 inline'/> 
            <Image src={angular} alt="react logo" width={50} className='h-auto mr-4 inline'/> 
            <p className='mt-[6px] inline'>Angular</p>
          </Link>
        </div>

        <div>
          <Link href="" className='pl-10'>
            <Image src={error} alt="react logo" width={30} className='h-auto mr-4 inline'/> 
            <Image src={vue} alt="react logo" width={50} className='h-auto mr-4 inline'/> 
            <p className='mt-[6px] inline'>Vue</p>
          </Link>
        </div>
      </div>

      <p className='mt-6'>In the upcoming iterations the above frameworks will be implemented, stay tuned for the next updates.</p>


    </div>
  );
}

export default Frameworks;