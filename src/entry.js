import { Game, Player } from './nostaligc/nostalgic';

import Sandsack from './game/sandsack';
import TestScene from './game/scenes/test';

import './style/app.scss';

window.onload = () => {
    Game(TestScene, Player, [ Sandsack ]);
};