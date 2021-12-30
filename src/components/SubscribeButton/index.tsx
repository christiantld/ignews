import {useSession, signIn} from 'next-auth/client';
import { useRouter } from 'next/router';
import { api } from '../../service/api';
import { getStripeJs } from '../../service/stripe-client';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string;
}

export default function SubscribeButton({priceId}: SubscribeButtonProps) {
  const [session] = useSession()
  const router = useRouter()
  async  function handleSubscribe() {
    if(!session) {
      signIn('github')
      return
    }

    if(session.activeSubscription) {
      router.push('/posts')
      return;
    }

    try {
      const { data }= await api.post('/subscribe')
      const { sessionId } = data

      const stripe = await getStripeJs()
      await stripe.redirectToCheckout({sessionId})

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <button type="button" className={styles.subscribeButton} onClick={handleSubscribe}>
      Subsscribe Now
    </button>
  )
}
