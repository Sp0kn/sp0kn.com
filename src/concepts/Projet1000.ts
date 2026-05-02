import type { Concept } from './types'

const Projet1000: Concept = {
  id: 'projet-1000',
  title: 'Projet 1000',
  subtitle: 'Découverte des meilleurs jeux!',
  description:
    'Dans le Projet 1000, Sp0kn tente de jouer aux 1000 meilleurs jeux de tous les temps!\n' +
    'La liste est tirée d\'Acclaimed Video Games, un projet qui classe les jeux les plus acclamés ' +
    'à partir de plus de 900 listes journalistiques.\n' +
	'Un véritable voyage à travers l\'histoire du jeu vidéo.',
  emoji: '🎮',
  links: [
    {
      label: 'Acclaimed Video Games',
      url: 'https://www.acclaimedvideogames.com/',
    },
	{
      label: 'Checklist de Sp0kn',
      url: 'https://docs.google.com/spreadsheets/d/1y3l4TjxDsOQXcxX8RqsWgElIhau6MbV5jXcCAlehfvE/edit?gid=0#gid=0',
    },
  ],
}

export default Projet1000
