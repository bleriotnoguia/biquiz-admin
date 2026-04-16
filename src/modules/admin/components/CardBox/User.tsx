import { mdiCheckDecagram } from '@mdi/js'
import CardBox from '.'
import PillTag from '../PillTag'
import UserAvatarCurrentUser from '../UserAvatar/CurrentUser'
import { useAppSelector } from '@/config/store'

type Props = {
  className?: string
}

const CardBoxUser = ({ className }: Props) => {
  const userName = useAppSelector((state) => state.auth.session.user?.name)
  const userEmail = useAppSelector((state) => state.auth.session.user?.email)

  return (
    <CardBox className={`overflow-hidden ${className}`} hasComponentLayout>
      {/* Gradient banner */}
      <div className="h-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-2xl" />

      {/* Avatar + info */}
      <div className="px-6 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-10 gap-4">
          <div className="w-20 h-20 rounded-2xl ring-4 ring-white dark:ring-slate-800 overflow-hidden bg-white dark:bg-slate-800 flex-shrink-0">
            <UserAvatarCurrentUser className="w-full h-full" />
          </div>
          <div className="mb-1">
            <PillTag label="Verified" color="info" icon={mdiCheckDecagram} small />
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            {userName ?? 'User'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{userEmail}</p>
        </div>
      </div>
    </CardBox>
  )
}

export default CardBoxUser
