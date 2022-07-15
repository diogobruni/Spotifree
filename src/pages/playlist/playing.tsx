import PlaylistSongs from '../../components/PlaylistSongs'
import Loading from '../../components/Loading'
import usePlayer from '../../hooks/usePlayer'
import HeaderCover from '../../components/HeaderCover'

type Props = {}

export default function Playlist({ }: Props) {
  const {
    playerPlaylist
  } = usePlayer()

  if (!playerPlaylist)
    return <Loading />

  return (
    <main>
      <HeaderCover
        title="Playing now"
        image={{ url: "https://pbs.twimg.com/profile_images/560739405543907328/kOWO3V15_400x400.png", width: 224, height: 224 }}
      />

      <PlaylistSongs trackList={playerPlaylist} />
    </main>
  )
}