import { FaGithub } from 'react-icons/fa'
import {FiX} from 'react-icons/fi'
import { signIn, signOut, useSession } from 'next-auth/client'
import styles from './styles.module.scss';


export default function SignInButton() {
  const [session] = useSession()

  const isUserLogedIn = session;

  return isUserLogedIn ? (
    <button className={styles.signInButton} type="button" onClick={() => signOut()}>
      <FaGithub color="#04d361"/>
      {session.user.name}
      <FiX color="#737373" className={styles.closeIcon} />
    </button>
  ) : (
      <button className={styles.signInButton} type="button" onClick={()=>signIn('github')}>
      <FaGithub color="#eba417"/>
      Sign In With Github
    </button>
  )
}
