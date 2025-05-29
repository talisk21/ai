'use client'

import Icon from "@/components/Icon";
import './styles.scss';
import Button from "@/components/Button";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleProceed = () => {
    router.push(`/executions`);
  }

  return (
    <div className='home-page'>
      <div className='home-page__container'>
        <div className='logo'>
          <Icon name='chip-ai' />
        </div>
        <div className='home-page__page-text-wrapper'>
          <h1>Welcome to our AI project!</h1>
          <Button onClick={handleProceed}>Proceed to chats</Button>
        </div>
      </div>
    </div>
  );
}
