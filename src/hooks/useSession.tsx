import { IAuth } from '@/interfaces/AuthInterface';
import { IFlash, ISession } from '@/interfaces/SessionInterface';

export default async function useSession(): Promise<ISession> {
  const response = await fetch('/api/session');

  if (response.status === 200) {
    const { auth, flash } = await response.json();
    return { auth, flash };
  }

  return { auth: {} as IAuth, flash: {} as IFlash };
}
