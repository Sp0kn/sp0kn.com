import type { Concept } from './types'

const Nuzlocke: Concept = {
  id: 'nuzlocke',
  title: 'Pokémon Platinum Nuzlocke',
  subtitle: 'Deviens un Pokémon et carry la team!',
  description:
    'Sp0kn se lance dans une run Nuzlocke sur Pokémon Platinum! ' +
    'Un Nuzlocke est un défi où chaque Pokémon qui tombe au combat est considéré comme mort ' +
    'et retiré définitivement de l\'équipe, et où seul le premier Pokémon rencontré dans chaque ' +
    'nouvelle zone peut être capturé. ' +
    'Chaque Pokémon capturé est nommé par la communauté via un sub, des bits ou des points de chaîne, ' +
    'ce qui crée un lien unique entre les viewers et l\'équipe. ' +
    'Une aventure intense et émotionnelle, avec des règles personnalisées imaginées par Sp0kn!',
  emoji: '⚪',
  imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/960px-Pok%C3%A9_Ball_icon.svg.png',
  sections: [
    {
      title: 'Capture de Pokémon',
      rules: [
        {
          text: 'Le Pokémon de départ a été choisi par le gagnant de la Watchers League Saison 2.',
        },
        {
          text: 'Le premier Pokémon rencontré dans chaque zone doit être capturé. Aucune autre espèce ne peut être capturée dans cette même zone.',
        },
        {
          text: 'Si la tentative de capture échoue, on peut réessayer, mais uniquement pour ce même Pokémon.',
        },
        {
          text: 'Si l\'espèce rencontrée est déjà dans notre possession, le deuxième Pokémon rencontré dans la zone devient la cible de capture, et ainsi de suite.',
        },
        {
          text: 'Tout Pokémon qui tombe au combat est retiré définitivement de l\'équipe et placé dans la Boîte Cimetière.',
        },
      ],
    },
    {
      title: 'Attribution des noms',
      rules: [
        {
          text: 'Les noms sont attribués selon une liste d\'attente — le prochain Pokémon capturé reçoit le prochain nom en ligne.',
        },
        {
          text: 'Un système de priorité s\'applique :',
          sub: [
            'Priorité haute — Abonnements Twitch / 400 bits / abonnements offerts / dons / jeu sur la wishlist Steam',
            'Priorité moyenne — Abonnements Patreon',
            'Priorité basse — Échange de points de chaîne',
          ],
        },
        {
          text: 'Priorité haute : le donateur choisit librement le nom du Pokémon.',
        },
        {
          text: 'Échange de points : le nom attribué correspond au pseudo du viewer.',
        },
      ],
    },
    {
      title: 'Niveaux et progression',
      rules: [
        {
          text: 'À chaque niveau gagné par un Pokémon, tous les Pokémon de l\'équipe active reçoivent un Rare Candy. Cela accélère la progression et élimine le grinding.',
        },
        {
          text: 'Aucun Pokémon ne peut dépasser le niveau plafond, défini par le prochain Gym Leader.',
        },
        {
          text: 'Un Pokémon déjà au niveau plafond ne peut pas recevoir de Rare Candy. S\'il dépasse naturellement ce plafond, il ne pourra pas participer aux combats du prochain Gym.',
        },
        {
          text: 'Un Pokémon sorti de la boîte PC peut être monté jusqu\'au niveau plancher, défini par le dernier badge obtenu.',
        },
      ],
    },
    {
      title: 'Composition de l\'équipe',
      rules: [
        {
          text: 'Une rotation de l\'équipe active a lieu à chaque heure.',
        },
        {
          text: 'Le Pokémon de départ fait toujours partie de l\'équipe active (tant qu\'il est en vie).',
        },
        {
          text: 'Les Pokémon 2, 3 et 4 sont choisis aléatoirement selon le système d\'impatience.',
        },
        {
          text: 'Les Pokémon 5 et 6 sont choisis par Sp0kn, ou selon le système d\'impatience si l\'équipe est déjà bien couverte.',
        },
        {
          text: 'Système d\'impatience :',
          sub: [
            'Les Pokémon inactifs accumulent des points d\'impatience.',
            'À chaque rotation, un Pokémon non sélectionné gagne 1 point d\'impatience.',
            'Chaque point d\'impatience augmente ses chances d\'être choisi.',
            'Lorsqu\'un Pokémon est sélectionné, son impatience retombe à 0.',
          ],
        },
      ],
    },
    {
      title: 'Règles spéciales',
      rules: [
        {
          text: 'Pas de "wipe" : si tous les Pokémon tombent au combat, le dernier survivant reste en vie et la partie continue!',
        },
      ],
    },
    {
      title: 'Influence des viewers',
      rules: [
        { text: '50 bits → +1 niveau à un Pokémon de son choix.' },
        { text: '200 bits → +1 niveau à toute l\'équipe.' },
        { text: '150 bits → Promouvoir un Pokémon de son choix dans l\'équipe active.' },
        { text: 'Points de chaîne → Donner 1 point d\'impatience au Pokémon de son choix (2 points pour les VIPs!).' },
      ],
    },
  ],
}

export default Nuzlocke
