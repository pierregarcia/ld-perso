const OPENMOJI_CP = "https://openmoji.org/data/color/svg/";

function modeleCP(serie, titre, consigne, choix, donnees){
  return { serie, titre, consigne, choix, imagesOnly:true,
    items:donnees.split(",").map(ligne => {
      const [texte, icone, bonne] = ligne.split("|");
      return { texte, icone, bonne:Number(bonne) };
    }) };
}

function modeleTexte(groupe, serie, titre, consigne, choix, premiers, deuxiemes, troisiemes){
  const construire = (donnees, bonne) => donnees.split("/").map(texte => ({ texte, icone:"", bonne }));
  return { groupe, serie, titre, consigne, choix,
    items:[...construire(premiers, 0), ...construire(deuxiemes, 1), ...construire(troisiemes, 2)] };
}

const PARCOURS_CP = [
  modeleCP(1, "Francais - Voyelles a, e, o", "Regarde l'image. Choisis la lettre qui commence le mot.", ["a","e","o"],
    "ananas|1F34D|0,avion|2708|0,abeille|1F41D|0,araignee|1F577|0,enveloppe|2709|1,escargot|1F40C|1,elephant|1F418|1,etoile|2B50|1,orange|1F34A|2,ours|1F43B|2,oiseau|1F426|2,ordinateur|1F4BB|2"),
  modeleCP(2, "Francais - Sons f, v, ch", "Regarde l'image. Choisis le son qui commence le mot.", ["f","v","ch"],
    "fleur|1F33C|0,fraise|1F353|0,feuille|1F343|0,fusee|1F680|0,vache|1F404|1,velo|1F6B2|1,voiture|1F697|1,violon|1F3BB|1,chat|1F408|2,chien|1F415|2,chaussure|1F45F|2,chocolat|1F36B|2"),
  modeleCP(3, "Francais - Consonnes m, l, r", "Regarde l'image. Choisis la lettre qui commence le mot.", ["m","l","r"],
    "moto|1F3CD|0,maison|1F3E0|0,main|270B|0,montagne|26F0|0,lune|1F319|1,livre|1F4D6|1,lion|1F981|1,lapin|1F407|1,renard|1F98A|2,robot|1F916|2,rose|1F339|2,raisin|1F347|2"),
  modeleCP(4, "Francais - Consonnes p, t, s", "Regarde l'image. Choisis la lettre qui commence le mot.", ["p","t","s"],
    "pomme|1F34E|0,poule|1F414|0,papa|1F468|0,parapluie|2602|0,tortue|1F422|1,tomate|1F345|1,telephone|1F4DE|1,train|1F682|1,soleil|2600|2,souris|1F401|2,singe|1F412|2,salade|1F957|2"),
  modeleCP(5, "Francais - Premieres syllabes", "Regarde l'image. Choisis la premiere syllabe du mot.", ["ma","la","ra"],
    "maison|1F3E0|0,maman|1F469|0,moto|1F3CD|0,main|270B|0,lapin|1F407|1,lait|1F95B|1,lune|1F319|1,lampe|1F4A1|1,radio|1F4FB|2,raisin|1F347|2,rat|1F400|2,raquette|1F3BE|2"),
  modeleCP(6, "Francais - Categories de mots", "Regarde l'image. Choisis sa categorie.", ["animal","fruit","vehicule"],
    "chat|1F408|0,poisson|1F41F|0,cheval|1F40E|0,pomme|1F34E|1,banane|1F34C|1,raisin|1F347|1,velo|1F6B2|2,bus|1F68C|2,train|1F682|2"),
  modeleCP(7, "Francais - Verbes d'action", "Regarde l'image. Choisis le verbe qui convient.", ["dort","mange","court"],
    "dormir|1F634|0,lit|1F6CF|0,manger|1F37D|1,pomme|1F34F|1,courir|1F3C3|2,course|1F3C3|2,dormir|1F634|0,manger|1F37D|1,courir|1F3C3|2"),
  modeleCP(8, "Francais - Singulier ou pluriel", "Regarde l'image. Choisis le bon determinant.", ["un","une","des"],
    "chat|1F408|0,livre|1F4D6|0,ballon|26BD|0,pomme|1F34E|1,fleur|1F33C|1,maison|1F3E0|1,des pommes|1F34E|2,des livres|1F4D6|2,des ballons|26BD|2"),
  modeleCP(9, "Mathematiques - Lire les nombres 1, 2, 3", "Regarde le chiffre. Choisis son nom.", ["un","deux","trois"],
    "1|0031-FE0F-20E3|0,2|0032-FE0F-20E3|1,3|0033-FE0F-20E3|2,1|0031-FE0F-20E3|0,2|0032-FE0F-20E3|1,3|0033-FE0F-20E3|2,1|0031-FE0F-20E3|0,2|0032-FE0F-20E3|1,3|0033-FE0F-20E3|2"),
  modeleCP(10, "Mathematiques - Lire les nombres 4, 5, 6", "Regarde le chiffre. Choisis son nom.", ["quatre","cinq","six"],
    "4|0034-FE0F-20E3|0,5|0035-FE0F-20E3|1,6|0036-FE0F-20E3|2,4|0034-FE0F-20E3|0,5|0035-FE0F-20E3|1,6|0036-FE0F-20E3|2,4|0034-FE0F-20E3|0,5|0035-FE0F-20E3|1,6|0036-FE0F-20E3|2"),
  modeleCP(11, "Mathematiques - Comparer les nombres", "Lis le nombre. Choisis sa place par rapport a 5.", ["plus petit","egal","plus grand"],
    "1|0031-FE0F-20E3|0,3|0033-FE0F-20E3|0,4|0034-FE0F-20E3|0,5|0035-FE0F-20E3|1,6|0036-FE0F-20E3|2,7|0037-FE0F-20E3|2,2|0032-FE0F-20E3|0,5|0035-FE0F-20E3|1,8|0038-FE0F-20E3|2"),
  modeleCP(12, "Mathematiques - Additions", "Calcule. Choisis le resultat.", ["1","2","3"],
    "0 + 1|0030-FE0F-20E3|0,1 + 0|0031-FE0F-20E3|0,1 + 1|0031-FE0F-20E3|1,2 + 0|0032-FE0F-20E3|1,1 + 2|0031-FE0F-20E3|2,2 + 1|0032-FE0F-20E3|2,0 + 1|0030-FE0F-20E3|0,1 + 1|0031-FE0F-20E3|1,1 + 2|0031-FE0F-20E3|2"),
  modeleCP(13, "Mathematiques - Soustractions", "Calcule. Choisis le resultat.", ["0","1","2"],
    "1 - 1|0031-FE0F-20E3|0,2 - 2|0032-FE0F-20E3|0,1 - 0|0031-FE0F-20E3|1,2 - 1|0032-FE0F-20E3|1,2 - 0|0032-FE0F-20E3|2,3 - 1|0033-FE0F-20E3|2,1 - 1|0031-FE0F-20E3|0,2 - 1|0032-FE0F-20E3|1,3 - 1|0033-FE0F-20E3|2"),
  modeleCP(14, "Mathematiques - Formes geometriques", "Regarde la forme. Choisis son nom.", ["cercle","carre","triangle"],
    "cercle|1F534|0,carre|1F7E6|1,triangle|1F53A|2,cercle|1F534|0,carre|1F7E6|1,triangle|1F53A|2,cercle|1F534|0,carre|1F7E6|1,triangle|1F53A|2"),
  modeleCP(15, "Mathematiques - Reperage", "Observe la fleche. Choisis la direction.", ["en haut","en bas","a droite"],
    "haut|2B06|0,haut|1F53C|0,bas|2B07|1,bas|1F53D|1,droite|27A1|2,droite|27A1|2,haut|2B06|0,bas|2B07|1,droite|27A1|2"),
  modeleCP(16, "Questionner le monde - Journee", "Regarde l'image. Choisis le moment de la journee.", ["matin","soir","nuit"],
    "matin|1F305|0,matin|1F305|0,soir|1F307|1,soir|1F307|1,nuit|1F319|2,nuit|1F319|2,matin|1F305|0,soir|1F307|1,nuit|1F319|2"),
  modeleCP(17, "Questionner le monde - Saisons", "Regarde l'image. Choisis la saison.", ["printemps","ete","hiver"],
    "fleur|1F33C|0,arbre en fleurs|1F338|0,soleil|2600|1,plage|1F3D6|1,neige|2744|2,bonhomme de neige|2603|2,fleur|1F33C|0,soleil|2600|1,neige|2744|2"),
  modeleCP(18, "Questionner le monde - Le vivant", "Regarde l'image. Choisis sa categorie.", ["animal","plante","objet"],
    "chat|1F408|0,poisson|1F41F|0,oiseau|1F426|0,arbre|1F333|1,fleur|1F33B|1,cactus|1F335|1,livre|1F4D6|2,velo|1F6B2|2,robot|1F916|2"),
  modeleCP(19, "Questionner le monde - Les cinq sens", "Regarde l'image. Choisis le sens utilise.", ["voir","entendre","sentir"],
    "oeil|1F441|0,lunettes|1F453|0,oreille|1F442|1,musique|1F3B5|1,fleur|1F33C|2,parfum|1F9F4|2,oeil|1F441|0,oreille|1F442|1,fleur|1F33C|2"),
  modeleCP(20, "Questionner le monde - Eau, terre, ciel", "Regarde l'image. Choisis ou il se trouve.", ["eau","terre","ciel"],
    "poisson|1F41F|0,bateau|26F5|0,arbre|1F333|1,maison|1F3E0|1,nuage|2601|2,avion|2708|2,poisson|1F41F|0,arbre|1F333|1,nuage|2601|2"),
  modeleCP(21, "Arts plastiques - Les couleurs", "Regarde la couleur. Choisis son nom.", ["rouge","bleu","jaune"],
    "rouge|1F534|0,rouge|1F534|0,bleu|1F535|1,bleu|1F535|1,jaune|1F7E1|2,jaune|1F7E1|2,rouge|1F534|0,bleu|1F535|1,jaune|1F7E1|2"),
  modeleCP(22, "Education musicale - Instruments", "Regarde l'instrument. Choisis son nom.", ["piano","guitare","tambour"],
    "piano|1F3B9|0,piano|1F3B9|0,guitare|1F3B8|1,guitare|1F3B8|1,tambour|1FA98|2,tambour|1FA98|2,piano|1F3B9|0,guitare|1F3B8|1,tambour|1FA98|2"),
  modeleCP(23, "EPS - Les actions", "Regarde l'image. Choisis l'action.", ["court","saute","lance"],
    "courir|1F3C3|0,courir|1F3C3|0,sauter|1F938|1,sauter|1F938|1,lancer|1F3AF|2,lancer|1F3AF|2,courir|1F3C3|0,sauter|1F938|1,lancer|1F3AF|2"),
  modeleCP(24, "EMC - Les emotions", "Regarde le visage. Choisis l'emotion.", ["joyeux","triste","en colere"],
    "joyeux|1F604|0,joyeux|1F604|0,triste|1F622|1,triste|1F622|1,en colere|1F620|2,en colere|1F620|2,joyeux|1F604|0,triste|1F622|1,en colere|1F620|2"),
  modeleCP(25, "Anglais - Colours", "Look at the colour. Choose its English name.", ["red","blue","yellow"],
    "red|1F534|0,red|1F534|0,blue|1F535|1,blue|1F535|1,yellow|1F7E1|2,yellow|1F7E1|2,red|1F534|0,blue|1F535|1,yellow|1F7E1|2"),
  modeleCP(26, "Francais - Sons b, d, g", "Regarde l'image. Choisis la lettre qui commence le mot.", ["b","d","g"],
    "ballon|26BD|0,banane|1F34C|0,bateau|26F5|0,bus|1F68C|0,dauphin|1F42C|1,dinosaure|1F996|1,dragon|1F409|1,drapeau|1F3F3|1,gateau|1F370|2,gant|1F9E4|2,gorille|1F98D|2,guitare|1F3B8|2"),
  modeleCP(27, "Francais - Premieres syllabes pa, ta, sa", "Regarde l'image. Choisis la premiere syllabe du mot.", ["pa","ta","sa"],
    "papa|1F468|0,panda|1F43C|0,papillon|1F98B|0,parapluie|2602|0,tapis|1F6CB|1,tasse|2615|1,table|1FA91|1,tomate|1F345|1,salade|1F957|2,savon|1F9FC|2,singe|1F412|2,sac|1F45C|2"),
  modeleCP(28, "Francais - Objets de la classe", "Regarde l'image. Choisis ou l'on utilise cet objet.", ["ecole","jeu","cuisine"],
    "livre|1F4D6|0,crayon|270F|0,sac a dos|1F392|0,regle|1F4CF|0,ballon|26BD|1,velo|1F6B2|1,ours en peluche|1F9F8|1,puzzle|1F9E9|1,assiette|1F37D|2,cuillere|1F944|2,pain|1F35E|2,soupe|1F372|2"),
  modeleCP(29, "Questionner le monde - Milieux de vie", "Regarde l'animal. Choisis son milieu de vie.", ["ferme","foret","mer"],
    "vache|1F404|0,poule|1F414|0,cochon|1F416|0,cheval|1F40E|0,lion|1F981|1,renard|1F98A|1,singe|1F412|1,elephant|1F418|1,poisson|1F41F|2,dauphin|1F42C|2,baleine|1F40B|2,pieuvre|1F419|2"),
  modeleCP(30, "Francais - Sons c, n, v", "Regarde l'image ou lis le mot. Choisis la lettre qui commence le mot.", ["c","n","v"],
    "carotte|1F955|0,chat|1F408|0,chien|1F415|0,chocolat|1F36B|0,nuage|2601|1,neige|2744|1,nez|1F443|1,ninja|1F977|1,vache|1F404|2,velo|1F6B2|2,voiture|1F697|2,violon|1F3BB|2"),
  modeleCP(31, "Francais - Lire et classer", "Regarde l'image ou lis le mot. Choisis sa categorie.", ["meuble","vetement","aliment"],
    "table|1FA91|0,lampe|1F4A1|0,lit|1F6CF|0,canape|1F6CB|0,robe|1F457|1,chaussure|1F45F|1,chapeau|1F3A9|1,gant|1F9E4|1,pomme|1F34E|2,pain|1F35E|2,soupe|1F372|2,salade|1F957|2"),
  modeleTexte(2, 1, "Francais - Lire et classer", "Lis le mot. Choisis sa categorie.", ["animal","fruit","vehicule"],
    "chat/chien/lapin/cheval", "cerise/poire/banane/raisin", "velo/bus/train/camion"),
  modeleTexte(2, 2, "Francais - Les contraires", "Lis le mot. Choisis son contraire.", ["grand","petit","moyen"],
    "minuscule/court/leger/jeune", "immense/long/lourd/vieux", "normal/ordinaire/courant/simple"),
  modeleTexte(2, 3, "Francais - Nature des mots", "Lis le mot. Choisis sa nature.", ["nom","verbe","adjectif"],
    "chat/maison/ecole/ballon", "mange/dort/chante/court", "grand/petit/rouge/rapide"),
  modeleTexte(3, 1, "Mathematiques - Comparer a 10", "Lis le nombre. Compare-le a 10.", ["plus petit","egal","plus grand"],
    "1/4/7/9", "10 exactement/le nombre 10/10 unites/10 au total", "11/13/16/20"),
  modeleTexte(3, 2, "Mathematiques - Additions", "Calcule. Choisis le resultat.", ["4","5","6"],
    "1 + 3/2 + 2/3 + 1/4 + 0", "2 + 3/1 + 4/4 + 1/3 + 2", "3 + 3/4 + 2/5 + 1/2 + 4"),
  modeleTexte(3, 3, "Mathematiques - Soustractions", "Calcule. Choisis le resultat.", ["1","2","3"],
    "2 - 1/3 - 2/4 - 3/5 - 4", "3 - 1/4 - 2/5 - 3/6 - 4", "4 - 1/5 - 2/6 - 3/7 - 4"),
  modeleTexte(4, 1, "Mathematiques - Formes", "Lis la description. Choisis la forme.", ["cercle","carre","triangle"],
    "roue/assiette/ballon/horloge", "fenetre/damier/carreau/serviette", "toit/panneau/pointe/montagne"),
  modeleTexte(4, 2, "Mathematiques - Mesures", "Lis les deux longueurs. Choisis la bonne reponse.", ["plus court","egal","plus long"],
    "3 cm et 8 cm/5 cm et 9 cm/2 cm et 7 cm/1 cm et 6 cm", "4 cm et 4 cm/6 cm et 6 cm/8 cm et 8 cm/10 cm et 10 cm", "9 cm et 2 cm/8 cm et 3 cm/7 cm et 1 cm/6 cm et 4 cm"),
  modeleTexte(5, 1, "Questionner le monde - Les saisons", "Lis l'indice. Choisis la saison.", ["printemps","ete","hiver"],
    "les fleurs poussent/les bourgeons arrivent/les oiseaux font leur nid/il pleut souvent", "il fait chaud/on va a la plage/le soleil brille/les vacances arrivent", "il neige/on porte un manteau/le lac gele/il fait froid"),
  modeleTexte(5, 2, "Questionner le monde - Le vivant", "Lis le mot. Choisis sa categorie.", ["animal","plante","objet"],
    "chat/abeille/poisson/escargot", "arbre/fleur/herbe/cactus", "livre/velo/crayon/table"),
  modeleTexte(6, 1, "Anglais - Colours", "Read the word. Choose the French colour.", ["rouge","bleu","jaune"],
    "red/red paint/red car/red apple", "blue/blue sky/blue bag/blue pencil", "yellow/yellow sun/yellow flower/yellow lemon"),
  modeleTexte(6, 2, "EMC - Les emotions", "Lis la situation. Choisis l'emotion.", ["joyeux","triste","en colere"],
    "je recois un cadeau/je joue avec mes amis/je reussis un jeu/on me felicite", "mon jouet est casse/mon ami part/je suis seul/je perds mon doudou", "on prend mon jeu/on me pousse/on se moque de moi/je ne peux pas jouer"),
  modeleTexte(1, 32, "Francais - Sons an, on, in", "Lis le mot. Choisis le son que tu entends.", ["an","on","in"],
    "enfant/banc/lampe/pantalon", "ballon/pont/mouton/bonbon", "lapin/main/train/matin"),
  modeleTexte(1, 33, "Francais - Lire des syllabes", "Lis la syllabe. Choisis sa voyelle.", ["a","i","ou"],
    "ma/ra/sa/la", "mi/ri/li/si", "mou/rou/sou/lou"),
  modeleTexte(1, 34, "Francais - Lire des mots reguliers", "Lis le mot. Choisis sa categorie.", ["animal","objet","aliment"],
    "rat/loup/chat/lion", "sac/lit/velo/livre", "riz/sel/lait/pain"),
  modeleTexte(2, 4, "Francais - Les types de phrases", "Lis la phrase. Choisis son type.", ["question","ordre","phrase"],
    "Ou est le chat ?/Qui arrive ?/Tu viens ?/Quel jour sommes-nous ?", "Range ta chambre./Ferme la porte./Ecoute bien./Dessine un soleil.", "Le chat dort./Il pleut dehors./La lune brille./Le bus arrive."),
  modeleTexte(2, 5, "Francais - Le genre", "Lis le mot. Choisis le determinant.", ["un","une","des"],
    "chat/livre/velo/ballon", "pomme/fleur/maison/table", "amis/livres/fleurs/ballons"),
  modeleTexte(2, 6, "Francais - Le nombre", "Lis le groupe de mots. Choisis le nombre.", ["un seul","plusieurs","aucun"],
    "un chat/une pomme/un livre/une fleur", "des chats/des pommes/des livres/des fleurs", "zero chat/zero pomme/zero livre/zero fleur"),
  modeleTexte(3, 4, "Mathematiques - Comparer a 20", "Lis le nombre. Compare-le a 20.", ["plus petit","egal","plus grand"],
    "11/14/17/19", "20 exactement/le nombre 20/20 unites/20 au total", "21/25/30/40"),
  modeleTexte(3, 5, "Mathematiques - Dizaines et unites", "Lis l'ecriture. Choisis le nombre.", ["12","15","18"],
    "une dizaine et deux unites/10 + 2/douze/12", "une dizaine et cinq unites/10 + 5/quinze/15", "une dizaine et huit unites/10 + 8/dix-huit/18"),
  modeleTexte(3, 6, "Mathematiques - Problemes additifs", "Lis le probleme. Choisis le resultat.", ["5","6","7"],
    "2 pommes et 3 pommes/1 bille et 4 billes/3 chats et 2 chats/5 oiseaux et 0 oiseau", "2 bonbons et 4 bonbons/3 ballons et 3 ballons/1 livre et 5 livres/4 fleurs et 2 fleurs", "3 pommes et 4 pommes/5 billes et 2 billes/1 chat et 6 chats/4 ballons et 3 ballons"),
  modeleTexte(3, 7, "Mathematiques - Problemes de retrait", "Lis le probleme. Choisis le resultat.", ["2","3","4"],
    "5 pommes, on en mange 3/4 billes, on en perd 2/3 oiseaux, un vole/6 fleurs, on en coupe 4", "6 bonbons, on en donne 3/5 fleurs, on en coupe 2/4 ballons, un eclate/7 billes, on en perd 4", "7 pommes, on en mange 3/6 billes, on en perd 2/5 oiseaux, un vole/8 fleurs, on en coupe 4"),
  modeleTexte(4, 3, "Mathematiques - Se reperer", "Lis la consigne. Choisis la position.", ["a gauche","a droite","au milieu"],
    "la porte est à gauche/la fleur est à gauche/le chat va à gauche/le bus tourne à gauche", "la fenêtre est à droite/le vélo va à droite/le train tourne à droite/le soleil est à droite", "la table est au milieu/le ballon est au milieu/le banc est au milieu/la maison est au milieu"),
  modeleTexte(4, 4, "Mathematiques - Lire l'heure", "Lis l'heure. Choisis le moment.", ["matin","midi","soir"],
    "7 h/8 h/9 h/10 h", "12 h/12 h 30/11 h 45/12 h 15", "18 h/19 h/20 h/21 h"),
  modeleTexte(4, 5, "Mathematiques - La monnaie", "Lis le prix. Choisis la piece necessaire.", ["1 euro","2 euros","5 euros"],
    "1 euro/un euro/1,00 euro/un euro pile", "2 euros/deux euros/2,00 euros/deux euros pile", "5 euros/cinq euros/5,00 euros/cinq euros pile"),
  modeleTexte(5, 3, "Questionner le monde - Les materiaux", "Lis l'objet. Choisis son materiau.", ["bois","metal","plastique"],
    "table/porte/arbre/crayon", "cle/canette/velo/cuillere", "bouteille/jouet/sac/regle"),
  modeleTexte(5, 4, "Questionner le monde - Le corps", "Lis le mot. Choisis la partie du corps.", ["tete","main","pied"],
    "oeil/nez/oreille/bouche", "doigt/pouce/paume/poignet", "orteil/talon/cheville/semelle"),
  modeleTexte(5, 5, "Questionner le monde - Les besoins du vivant", "Lis l'indice. Choisis le besoin.", ["eau","air","nourriture"],
    "boire/pluie/riviere/verre", "respirer/vent/poumons/souffle", "manger/graines/pain/repas"),
  modeleTexte(6, 3, "Education musicale - Les instruments", "Lis le mot. Choisis la famille.", ["cordes","percussions","vents"],
    "guitare/violon/harpe/ukulele", "tambour/cloche/xylophone/batterie", "flute/trompette/saxophone/clarinette"),
  modeleTexte(6, 4, "EPS - Les actions", "Lis l'action. Choisis la famille.", ["courir","sauter","lancer"],
    "sprinter/courir vite/courir loin/courir en relais", "sauter haut/sauter loin/sauter a cloche-pied/sauter par-dessus", "lancer loin/lancer precis/lancer une balle/lancer un sac"),
  modeleTexte(6, 5, "EMC - Vivre ensemble", "Lis la situation. Choisis la bonne action.", ["aider","partager","respecter"],
    "un ami tombe/un élève ne comprend pas/quelqu'un a perdu son crayon/un camarade est triste", "prêter un jeu/donner une part du matériel/faire une équipe/jouer chacun son tour", "écouter la parole/attendre son tour/dire bonjour/ranger le matériel")
];

function itemsDepuisGroupes(groupes){
  return groupes.flatMap((groupe, bonne) => groupe.map(texte => ({ texte, icone:"", bonne })));
}

function modeleProgressif(numero){
  const niveau = Math.floor((numero - 43) / 16) + 1;
  const famille = (numero - 43) % 16;
  const titre = `P${niveau} - `;
  if(famille === 0) return { titre:titre + "Francais - Comprendre une phrase", consigne:"Lis la phrase. Choisis la bonne reponse.", choix:["vrai","faux","on ne sait pas"],
    items:itemsDepuisGroupes([["Le chat miaule.","La pomme est un fruit.","Le soleil brille le jour.","Un poisson nage."], ["Un chat est un vehicule.","La neige est chaude.","Un livre est un animal.","La lune est un fruit."], ["Le chat aime le lait.","La pomme est rouge.","Le poisson dort la nuit.","Le bus est plein."]]) };
  if(famille === 1) return { titre:titre + "Francais - Remettre les mots dans l'ordre", consigne:"Lis les mots. Choisis le premier mot de la phrase.", choix:["Le","La","Les"],
    items:itemsDepuisGroupes([["Le chat dort.","Le bus arrive.","Le soleil brille.","Le loup court."], ["La lune monte.","La pomme tombe.","La fleur pousse.","La pluie tombe."], ["Les enfants jouent.","Les oiseaux chantent.","Les lapins sautent.","Les fleurs poussent."]]) };
  if(famille === 2) return { titre:titre + "Francais - Familles de mots", consigne:"Lis le mot. Choisis sa famille.", choix:["ecole","mer","jardin"],
    items:itemsDepuisGroupes([["eleve","maitresse","cahier","recreation"], ["poisson","bateau","vague","plage"], ["fleur","arbre","graine","arrosage"]]) };
  if(famille === 3) return { titre:titre + "Francais - Le verbe dans la phrase", consigne:"Lis la phrase. Choisis le verbe.", choix:["mange","dort","joue"],
    items:itemsDepuisGroupes([["Le chat mange.","La poule mange.","Le lapin mange.","Le chien mange."], ["Le bebe dort.","Le chat dort.","Le chien dort.","Le lion dort."], ["Paul joue.","Lina joue.","Le chat joue.","Le bebe joue."]]) };
  if(famille === 4){
    const base = 6 + niveau * 2;
    const choix = [String(base), String(base + 1), String(base + 2)];
    return { titre:titre + "Mathematiques - Additions", consigne:"Calcule. Choisis le resultat.", choix,
      items:itemsDepuisGroupes([[`${base - 1} + 1`,`${base - 2} + 2`,`${base - 3} + 3`,`${base} + 0`], [`${base - 1} + 2`,`${base - 2} + 3`,`${base - 3} + 4`,`${base} + 1`], [`${base - 1} + 3`,`${base - 2} + 4`,`${base - 3} + 5`,`${base} + 2`]]) };
  }
  if(famille === 5){
    const base = 4 + niveau * 2;
    const choix = [String(base), String(base + 1), String(base + 2)];
    return { titre:titre + "Mathematiques - Soustractions", consigne:"Calcule. Choisis le resultat.", choix,
      items:itemsDepuisGroupes([[`${base + 1} - 1`,`${base + 2} - 2`,`${base + 3} - 3`,`${base} - 0`], [`${base + 2} - 1`,`${base + 3} - 2`,`${base + 4} - 3`,`${base + 1} - 0`], [`${base + 3} - 1`,`${base + 4} - 2`,`${base + 5} - 3`,`${base + 2} - 0`]]) };
  }
  if(famille === 6){
    const pivot = Math.min(100, 10 + niveau * 5);
    return { titre:titre + "Mathematiques - Comparer les nombres", consigne:`Lis le nombre. Compare-le a ${pivot}.`, choix:["plus petit","egal","plus grand"],
      items:itemsDepuisGroupes([[String(pivot - 4),String(pivot - 3),String(pivot - 2),String(pivot - 1)], [`${pivot} exactement`,`le nombre ${pivot}`,`${pivot} unites`,`${pivot} au total`], [String(pivot + 1),String(pivot + 2),String(pivot + 3),String(pivot + 4)]]) };
  }
  if(famille === 7) return { titre:titre + "Mathematiques - Problemes", consigne:"Lis le probleme. Choisis l'operation.", choix:["addition","soustraction","partage"],
    items:itemsDepuisGroupes([["J'ai 3 billes puis 2 billes.","Il y a 4 pommes et 3 pommes.","Tom a 5 cartes puis 1 carte.","On voit 2 chats et 4 chats."], ["J'ai 7 billes, j'en perds 2.","Il y a 8 pommes, on en mange 3.","Tom a 6 cartes, il en donne 1.","On voit 9 chats, 4 partent."], ["6 bonbons pour 2 enfants.","8 cartes pour 2 joueurs.","9 billes pour 3 enfants.","6 pommes pour 3 amis."]]) };
  if(famille === 8) return { titre:titre + "Mathematiques - Geometrie", consigne:"Lis l'indice. Choisis la forme.", choix:["cercle","carre","triangle"],
    items:itemsDepuisGroupes([["une roue","une assiette","une horloge","une piece"], ["un damier","une fenetre","un carreau","une serviette"], ["un toit","un panneau","une montagne","une pointe"]]) };
  if(famille === 9) return { titre:titre + "Mathematiques - Grandeurs", consigne:"Lis les deux mesures. Choisis la bonne reponse.", choix:["plus court","egal","plus long"],
    items:itemsDepuisGroupes([["2 cm et 7 cm","4 cm et 9 cm","5 cm et 8 cm","1 cm et 6 cm"], ["3 cm et 3 cm","6 cm et 6 cm","9 cm et 9 cm","10 cm et 10 cm"], ["8 cm et 2 cm","9 cm et 4 cm","7 cm et 3 cm","6 cm et 1 cm"]]) };
  if(famille === 10) return { titre:titre + "Questionner le monde - Le vivant", consigne:"Lis le mot. Choisis sa categorie.", choix:["animal","plante","objet"],
    items:itemsDepuisGroupes([["abeille","tortue","renard","dauphin"], ["mousse","fougere","tulipe","chene"], ["cartable","ciseau","gourde","lampe"]]) };
  if(famille === 11) return { titre:titre + "Questionner le monde - La matiere", consigne:"Lis l'objet. Choisis son materiau.", choix:["bois","metal","plastique"],
    items:itemsDepuisGroupes([["branche","meuble","parquet","cabane"], ["clou","fourchette","cadenas","sonnette"], ["stylo","jouet","bouchon","regle"]]) };
  if(famille === 12) return { titre:titre + "Questionner le monde - Le temps", consigne:"Lis l'indice. Choisis le moment.", choix:["matin","après-midi","soir"],
    items:itemsDepuisGroupes([["je me lève","je prends le petit déjeuner","je vais à l'école","le soleil se lève"], ["je déjeune","je fais mes devoirs","je joue dehors","je goûte"], ["je dîne","je mets mon pyjama","je me couche","la nuit arrive"]]) };
  if(famille === 13) return { titre:titre + "Anglais - School words", consigne:"Read the word. Choose the French meaning.", choix:["livre","crayon","sac"],
    items:itemsDepuisGroupes([["book","story book","reading book","textbook"], ["pencil","red pencil","blue pencil","short pencil"], ["bag","school bag","blue bag","small bag"]]) };
  if(famille === 14) return { titre:titre + "EPS - Regles du jeu", consigne:"Lis la situation. Choisis la bonne action.", choix:["attendre","aider","respecter"],
    items:itemsDepuisGroupes([["un camarade joue avant moi","la maîtresse donne une consigne","je veux le ballon","je fais la queue"], ["un ami tombe","un élève a peur","un camarade ne sait pas","quelqu'un a perdu sa gourde"], ["je range le matériel","j'écoute le signal","je ne pousse pas","je dis bravo"]]) };
  return { titre:titre + "EMC - Vivre ensemble", consigne:"Lis la situation. Choisis la bonne action.", choix:["ecouter","partager","reparer"],
    items:itemsDepuisGroupes([["un ami parle","la maîtresse explique","un camarade raconte","on travaille en groupe"], ["il reste un jeu","nous avons des feutres","on fait une équipe","il y a des cartes"], ["un livre est déchiré","un crayon est cassé","un jeu est mal rangé","un objet tombe"]]) };
}

for(let numero = 43; numero <= 360; numero++) PARCOURS_CP.push(modeleProgressif(numero));

const PARCOURS_CP_V2 = PARCOURS_CP
  .filter(modele => modele.items.length === 12)
  .map((modele, index) => ({ ...modele, groupe:Math.floor(index / 60) + 1, serie:index % 60 + 1 }));

function melangerItems(items, graine){
  let dernierMelange = items.slice();
  for(let tentative = 0; tentative < 32; tentative++){
    const melanges = items.slice();
    let etat = (graine || 1) + tentative * 101;
    for(let index = melanges.length - 1; index > 0; index--){
      etat = (etat * 1664525 + 1013904223) >>> 0;
      const cible = etat % (index + 1);
      [melanges[index], melanges[cible]] = [melanges[cible], melanges[index]];
    }
    dernierMelange = melanges;
    const reponses = melanges.map(item => item.bonne).join("");
    if(!/000|111|222/.test(reponses)) return melanges;
  }
  return dernierMelange;
}

function creerFicheParcoursCP(modele){
  const items = melangerItems(modele.items, modele.groupe * 1000 + modele.serie);
  const questions = items.map((item, index) => {
    const utiliserImage = item.icone && (modele.imagesOnly || index % 2 === 0);
    return { texte:item.texte, image:utiliserImage ? OPENMOJI_CP + item.icone + ".svg" : "",
      propositions:modele.choix.map(texte => ({ texte, image:"" })), bonne:item.bonne };
  });
  return normaliserFiche({ groupe:String(modele.groupe || 1), serie:String(modele.serie), nbReponses:3, format:"cartes", theme:"s2",
    police:"andika", taille:1, encre:"couleur", double:false, titre:modele.titre, consigne:modele.consigne,
    couverture:questions[0].image, banniere:{ image:questions[0].image, x:50, y:50 }, questions });
}

function ajouterParcoursCP(){
  const nom = "CP - Parcours fondamental V2";
  let dossier = biblio.dossiers.find(element => element.nom === nom);
  if(!dossier){
    dossier = dossierVide(nom, "📘");
    biblio.dossiers.push(dossier);
  }
  const existantes = new Set(dossier.fiches.map(fiche => `${fiche.groupe}|${fiche.serie}`));
  const nouvelles = PARCOURS_CP_V2.filter(modele => !existantes.has(`${modele.groupe}|${modele.serie}`));
  if(!nouvelles.length){
    customAlert("Toutes les fiches du parcours CP sont deja presentes dans ce dossier.");
    return;
  }
  dossier.fiches.push(...nouvelles.map(creerFicheParcoursCP));
  sauvegarderBiblio();
  rendreDossier(dossier.id);
}

globalThis.lexidatelierParcoursCPV2 = PARCOURS_CP_V2;
globalThis.lexidatelierMelangerItems = melangerItems;