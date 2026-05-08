import type { Concept } from './types'

const MusicStreams: Concept = {
  id: 'music-streams',
  title: 'Music Streams',
  subtitle: 'Des cris dans tes oreilles!',
  description:
    'Sp0kn a une grande passion pour la musique et le chant... surtout lorsque c\'est intense!\n' +
    'Retrouvez-le en mode karaoké, que ce soit pour une chanson qu\'il connaît par coeur... ' +
    'ou qu\'il découvre en direct!\n' +
	'On peut même l\'apercevoir aux drums de temps à autre!',
  emoji: '🎤',
  links: [
	{
	  label: 'Liste des chansons',
	  url: 'https://www.streamersonglist.com/t/sp0kn/songs',
	},
  ],
}

export default MusicStreams
