import * as ex from "excalibur";
import {Resources} from "./Resources";


export class AnimalSprite {
    public static getSquareOutlineNoDetails(type: string, width?:number, height?:number): ex.Sprite {
        let tex = Resources.Animals_square_nodetails_outline;
        let conf = Graphics.ANIMALS.SQUARE_OUTLINE_NODETAILS[type];
        
        if (!conf) { console.warn(`AnimalSprite: Type ${type} not found.`); }
        
        return AnimalSprite.createSprite(tex, conf, width, height);
    }

    public static getSquareOutlineDetails(type: string, width?:number, height?:number): ex.Sprite {
        let tex = Resources.Animals_square_details_outline;
        let conf = Graphics.ANIMALS.SQUARE_OUTLINE_DETAILS[type];
        
        if (!conf) { console.warn(`AnimalSprite: Type ${type} not found.`); }
        
        return AnimalSprite.createSprite(tex, conf, width, height);
    }

    public static getRoundOutlineNoDetails(type: string, width?:number, height?:number): ex.Sprite {
        let tex = Resources.Animals_round_nodetails_outline;
        let conf = Graphics.ANIMALS.ROUND_OUTLINE_NODETAILS[type];
        
        if (!conf) { console.warn(`AnimalSprite: Type ${type} not found.`); }
        
        return AnimalSprite.createSprite(tex, conf, width, height);
    }

    public static getRoundOutlineDetails(type: string, width?:number, height?:number): ex.Sprite {
        let tex = Resources.Animals_round_details_outline;
        let conf = Graphics.ANIMALS.ROUND_OUTLINE_DETAILS[type];
        
        if (!conf) { console.warn(`AnimalSprite: Type ${type} not found.`); }
        
        return AnimalSprite.createSprite(tex, conf, width, height);
    }

    private static createSprite(tex: ex.Texture, conf: any, width?:number, height?:number): ex.Sprite {
        let w = conf.w;
        let h = conf.h;

        let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);

        if (height && width) {
            let scaleX = width/conf.w;
            let scaleY = height/conf.h;
            sprite.scale.setTo(scaleX, scaleY);
        }

        return sprite;
    }
}

export class Graphics {
    static ALIENS = {
        HIME: {
            spritesheet: Resources.PlayerSheetHime,
            frontal: {x: 70, y: 92, w: 66, h: 92},
            climb1: {x: 70, y: 0, w: 66, h: 92},
            climb2: {x: 135, y: 379, w: 66, h: 92},
            duck: {x: 0, y: 380, w: 69, h: 71},
            hurt: {x: 0, y: 288, w: 69, h: 92},
            jump: {x: 69, y: 286, w: 67, h: 93},
            stand: {x: 69, y: 379, w: 66, h: 92},
            swim1: {x: 0, y: 193, w: 69, h: 95},
            swim2: {x: 0, y: 96, w: 70, h: 97},
            walk1: {x: 69, y: 193, w: 68, h: 93},
            walk2: {x: 0, y: 0, w: 70, h: 96}
        },
        UNCLE: {
            spritesheet: Resources.PlayerSheetUncle,
            frontal: {x: 69, y: 255, w: 66, h: 82},
            climb1: {x: 69, y: 173, w: 66, h: 82},
            climb2: {x: 70, y: 0, w: 66, h: 82},
            duck: {x: 0, y: 422, w: 68, h: 67},
            hurt: {x: 0, y: 258, w: 69, h: 81},
            jump: {x: 68, y: 339, w: 67, h: 83},
            stand: {x: 68, y: 422, w: 66, h: 82},
            swim1: {x: 0, y: 173, w: 69, h: 85},
            swim2: {x: 0, y: 86, w: 70, h: 87},
            walk1: {x: 0, y: 339, w: 68, h: 83},
            walk2: {x: 0, y: 0, w: 70, h: 86}
        },
        UMATO: {
            spritesheet: Resources.PlayerSheetUmato,
            frontal: {x: 70, y: 92, w: 66, h: 92},
            climb1: {x: 70, y: 0, w: 66, h: 92},
            climb2: {x: 135, y: 379, w: 66, h: 92},
            duck: {x: 0, y: 380, w: 69, h: 71},
            hurt: {x: 0, y: 288, w: 69, h: 92},
            jump: {x: 69, y: 286, w: 67, h: 93},
            stand: {x: 69, y: 379, w: 66, h: 92},
            swim1: {x: 0, y: 193, w: 69, h: 95},
            swim2: {x: 0, y: 96, w: 70, h: 97},
            walk1: {x: 69, y: 193, w: 68, h: 93},
            walk2: {x: 0, y: 0, w: 70, h: 96}
        },
        BEIGE: {
            spritesheet: Resources.PlayerSheetBeige,
            frontal: {x: 70, y: 95, w: 66, h: 92},
            climb1: {x: 70, y: 0, w: 66, h: 95},
            climb2: {x: 134, y: 289, w: 66, h: 95},
            duck: {x: 67, y: 387, w: 67, h: 72},
            hurt: {x: 0, y: 387, w: 67, h: 92},
            jump: {x: 69, y: 196, w: 66, h: 93},
            stand: {x: 68, y: 294, w: 66, h: 92},
            swim1: {x: 0, y: 196, w: 69, h: 98},
            swim2: {x: 0, y: 0, w: 70, h: 100},
            walk1: {x: 0, y: 294, w: 68, h: 93},
            walk2: {x: 0, y: 100, w: 70, h: 96}
        },
        BLUE: {
            spritesheet: Resources.PlayerSheetBlue,
            frontal: {x: 70, y: 0, w: 66, h: 92},
            climb1: {x: 69, y: 97, w: 66, h: 92},
            climb2: {x: 133, y: 189, w: 66, h: 92},
            duck: {x: 0, y: 284, w: 67, h: 72},
            hurt: {x: 0, y: 192, w: 67, h: 92},
            jump: {x: 67, y: 192, w: 66, h: 93},
            stand: {x: 67, y: 378, w: 66, h: 92},
            swim1: {x: 0, y: 97, w: 69, h: 95},
            swim2: {x: 0, y: 0, w: 70, h: 97},
            walk1: {x: 67, y: 285, w: 66, h: 93},
            walk2: {x: 0, y: 356, w: 67, h: 96}
        },
        GREEN: {
            spritesheet: Resources.PlayerSheetGreen,
            frontal: {x: 70, y: 92, w: 66, h: 92},
            climb1: {x: 70, y: 0, w: 66, h: 92},
            climb2: {x: 135, y: 379, w: 66, h: 92},
            duck: {x: 0, y: 380, w: 69, h: 71},
            hurt: {x: 0, y: 288, w: 69, h: 92},
            jump: {x: 69, y: 286, w: 67, h: 93},
            stand: {x: 69, y: 379, w: 66, h: 92},
            swim1: {x: 0, y: 193, w: 69, h: 95},
            swim2: {x: 0, y: 96, w: 70, h: 97},
            walk1: {x: 69, y: 193, w: 68, h: 93},
            walk2: {x: 0, y: 0, w: 70, h: 96}
        },
        PINK: {
            spritesheet: Resources.PlayerSheetPink,
            frontal: {x: 70, y: 92, w: 66, h: 92},
            climb1: {x: 70, y: 0, w: 66, h: 92},
            climb2: {x: 135, y: 379, w: 66, h: 92},
            duck: {x: 0, y: 380, w: 69, h: 71},
            hurt: {x: 0, y: 288, w: 69, h: 92},
            jump: {x: 69, y: 286, w: 67, h: 93},
            stand: {x: 69, y: 379, w: 66, h: 92},
            swim1: {x: 0, y: 193, w: 69, h: 95},
            swim2: {x: 0, y: 96, w: 70, h: 97},
            walk1: {x: 69, y: 193, w: 68, h: 93},
            walk2: {x: 0, y: 0, w: 70, h: 96}
        },
        YELLOW: {
            spritesheet: Resources.PlayerSheetYellow,
            frontal: {x: 69, y: 255, w: 66, h: 82},
            climb1: {x: 69, y: 173, w: 66, h: 82},
            climb2: {x: 70, y: 0, w: 66, h: 82},
            duck: {x: 0, y: 422, w: 68, h: 67},
            hurt: {x: 0, y: 258, w: 69, h: 81},
            jump: {x: 68, y: 339, w: 67, h: 83},
            stand: {x: 68, y: 422, w: 66, h: 82},
            swim1: {x: 0, y: 173, w: 69, h: 85},
            swim2: {x: 0, y: 86, w: 70, h: 87},
            walk1: {x: 0, y: 339, w: 68, h: 83},
            walk2: {x: 0, y: 0, w: 70, h: 86}
        }
    };



    static ANIMALS = {
        SQUARE_OUTLINE_DETAILS: {
            bear:       {x: 194, y: 170, w: 170, h: 136},
            buffalo:    {x: 0, y: 306, w: 192, h: 162},
            chick:      {x: 658, y: 760, w: 136, h: 136},
            chicken:    {x: 658, y: 607, w: 136, h: 153},
            cow:        {x: 0, y: 170, w: 194, h: 136},
            crocodile:  {x: 655, y: 471, w: 136, h: 136},
            dog:        {x: 646, y: 136, w: 136, h: 169},
            duck:       {x: 582, y: 0, w: 136, h: 136},
            elephant:   {x: 0, y: 647, w: 192, h: 146},
            frog:       {x: 364, y: 169, w: 146, h: 136},
            giraffe:    {x: 276, y: 0, w: 170, h: 169},
            goat:       {x: 0, y: 468, w: 192, h: 179},
            gorilla:    {x: 657, y: 305, w: 136, h: 136},
            hippo:      {x: 192, y: 442, w: 174, h: 136},
            horse:      {x: 521, y: 320, w: 136, h: 151},
            monkey:     {x: 186, y: 793, w: 182, h: 136},
            moose:      {x: 0, y: 0, w: 276, h: 170},
            narwhal:    {x: 368, y: 743, w: 154, h: 153},
            owl:        {x: 370, y: 305, w: 136, h: 136},
            panda:      {x: 0, y: 793, w: 186, h: 136},
            parrot:     {x: 519, y: 578, w: 136, h: 136},
            penguin:    {x: 366, y: 442, w: 155, h: 136},
            pig:        {x: 192, y: 306, w: 178, h: 136},
            rabbit:     {x: 510, y: 136, w: 136, h: 184},
            rhino:      {x: 192, y: 578, w: 171, h: 136},
            sloth:      {x: 446, y: 0, w: 136, h: 136},
            snake:      {x: 782, y: 153, w: 136, h: 147},
            walrus:     {x: 522, y: 714, w: 136, h: 142},
            whale:      {x: 363, y: 578, w: 156, h: 165},
            zebra:      {x: 782, y: 0, w: 136, h: 153}
        },
        SQUARE_OUTLINE_NODETAILS: {
            bear:       {x: 272, y: 272, w: 136, h: 136},
            buffalo:    {x: 544, y: 544, w: 136, h: 136},
            chick:      {x: 544, y: 408, w: 136, h: 136},
            chicken:    {x: 544, y: 272, w: 136, h: 136},
            cow:        {x: 544, y: 136, w: 136, h: 136},
            crocodile:  {x: 544, y: 0, w: 136, h: 136},
            dog:        {x: 408, y: 680, w: 136, h: 136},
            duck:       {x: 408, y: 544, w: 136, h: 136},
            elephant:   {x: 408, y: 408, w: 136, h: 136},
            frog:       {x: 408, y: 272, w: 136, h: 136},
            giraffe:    {x: 408, y: 136, w: 136, h: 136},
            goat:       {x: 408, y: 0, w: 136, h: 136},
            gorilla:    {x: 272, y: 680, w: 136, h: 136},
            hippo:      {x: 272, y: 544, w: 136, h: 136},
            horse:      {x: 272, y: 408, w: 136, h: 136},
            monkey:     {x: 544, y: 680, w: 136, h: 136},
            moose:      {x: 272, y: 136, w: 136, h: 136},
            narwhal:    {x: 272, y: 0, w: 136, h: 136},
            owl:        {x: 136, y: 680, w: 136, h: 136},
            panda:      {x: 136, y: 544, w: 136, h: 136},
            parrot:     {x: 136, y: 408, w: 136, h: 136},
            penguin:    {x: 136, y: 272, w: 136, h: 136},
            pig:        {x: 136, y: 136, w: 136, h: 136},
            rabbit:     {x: 136, y: 0, w: 136, h: 136},
            rhino:      {x: 0, y: 680, w: 136, h: 136},
            sloth:      {x: 0, y: 544, w: 136, h: 136},
            snake:      {x: 0, y: 408, w: 136, h: 136},
            walrus:     {x: 0, y: 272, w: 136, h: 136},
            whale:      {x: 0, y: 136, w: 136, h: 136},
            zebra:      {x: 0, y: 0, w: 136, h: 136}
        },
        ROUND_NOOUTLINE_NODETAILS: {
            bear:       {x: 643, y: 513, w: 128, h: 129},
            buffalo:    {x: 129, y: 263, w: 129, h: 129},
            chick:      {x: 258, y: 640, w: 129, h: 128},
            chicken:    {x: 643, y: 257, w: 128, h: 128},
            cow:        {x: 129, y: 520, w: 129, h: 128},
            crocodile:  {x: 258, y: 384, w: 129, h: 128},
            dog:        {x: 261, y: 0, w: 129, h: 128},
            duck:       {x: 261, y: 128, w: 129, h: 128},
            elephant:   {x: 387, y: 256, w: 129, h: 128},
            frog:       {x: 390, y: 0, w: 128, h: 129},
            giraffe:    {x: 387, y: 640, w: 128, h: 129},
            goat:       {x: 515, y: 640, w: 128, h: 129},
            gorilla:    {x: 258, y: 512, w: 129, h: 128},
            hippo:      {x: 387, y: 384, w: 128, h: 128},
            horse:      {x: 0, y: 391, w: 129, h: 128},
            monkey:     {x: 643, y: 642, w: 128, h: 128},
            moose:      {x: 0, y: 263, w: 129, h: 128},
            narwhal:    {x: 0, y: 0, w: 132, h: 132},
            owl:        {x: 515, y: 512, w: 128, h: 128},
            panda:      {x: 258, y: 256, w: 129, h: 128},
            parrot:     {x: 132, y: 128, w: 129, h: 128},
            penguin:    {x: 132, y: 0, w: 129, h: 128},
            pig:        {x: 387, y: 512, w: 128, h: 128},
            rabbit:     {x: 129, y: 392, w: 129, h: 128},
            rhino:      {x: 516, y: 129, w: 128, h: 128},
            sloth:      {x: 0, y: 519, w: 129, h: 128},
            snake:      {x: 518, y: 0, w: 128, h: 128},
            walrus:     {x: 643, y: 385, w: 128, h: 128},
            whale:      {x: 0, y: 132, w: 132, h: 131},
            zebra:      {x: 515, y: 384, w: 128, h: 128}
        },
        ROUND_OUTLINE_NODETAILS: {
            bear:       {x: 547, y: 545, w: 136, h: 137},
            buffalo:    {x: 0, y: 551, w: 137, h: 137},
            chick:      {x: 140, y: 0, w: 137, h: 136},
            chicken:    {x: 683, y: 409, w: 136, h: 136},
            cow:        {x: 137, y: 415, w: 137, h: 136},
            crocodile:  {x: 277, y: 0, w: 137, h: 136},
            dog:        {x: 274, y: 544, w: 137, h: 136},
            duck:       {x: 277, y: 136, w: 137, h: 136},
            elephant:   {x: 411, y: 272, w: 137, h: 136},
            frog:       {x: 547, y: 408, w: 136, h: 137},
            giraffe:    {x: 414, y: 0, w: 136, h: 137},
            goat:       {x: 411, y: 680, w: 136, h: 137},
            gorilla:    {x: 274, y: 680, w: 137, h: 136},
            hippo:      {x: 550, y: 0, w: 136, h: 136},
            horse:      {x: 0, y: 415, w: 137, h: 136},
            monkey:     {x: 683, y: 273, w: 136, h: 136},
            moose:      {x: 0, y: 279, w: 137, h: 136},
            narwhal:    {x: 0, y: 0, w: 140, h: 140},
            owl:        {x: 547, y: 682, w: 136, h: 136},
            panda:      {x: 274, y: 408, w: 137, h: 136},
            parrot:     {x: 274, y: 272, w: 137, h: 136},
            penguin:    {x: 140, y: 136, w: 137, h: 136},
            pig:        {x: 411, y: 408, w: 136, h: 136},
            rabbit:     {x: 137, y: 551, w: 137, h: 136},
            rhino:      {x: 548, y: 137, w: 136, h: 136},
            sloth:      {x: 137, y: 279, w: 137, h: 136},
            snake:      {x: 411, y: 544, w: 136, h: 136},
            walrus:     {x: 683, y: 545, w: 136, h: 136},
            whale:      {x: 0, y: 140, w: 140, h: 139},
            zebra:      {x: 683, y: 681, w: 136, h: 136}
        },
        ROUND_OUTLINE_DETAILS: {
            bear:       {x: 277, y: 0, w: 162, h: 140},
            buffalo:    {x: 0, y: 349, w: 191, h: 160},
            chick:      {x: 647, y: 464, w: 137, h: 136},
            chicken:    {x: 775, y: 600, w: 136, h: 153},
            cow:        {x: 353, y: 340, w: 153, h: 136},
            crocodile:  {x: 638, y: 784, w: 137, h: 136},
            dog:        {x: 643, y: 299, w: 137, h: 165},
            duck:       {x: 640, y: 163, w: 137, h: 136},
            elephant:   {x: 0, y: 509, w: 191, h: 162},
            frog:       {x: 502, y: 163, w: 138, h: 152},
            giraffe:    {x: 192, y: 170, w: 162, h: 170},
            goat:       {x: 0, y: 170, w: 192, h: 179},
            gorilla:    {x: 638, y: 648, w: 137, h: 136},
            hippo:      {x: 191, y: 485, w: 162, h: 136},
            horse:      {x: 506, y: 315, w: 137, h: 149},
            monkey:     {x: 0, y: 671, w: 182, h: 136},
            moose:      {x: 0, y: 0, w: 277, h: 170},
            narwhal:    {x: 502, y: 0, w: 146, h: 163},
            owl:        {x: 780, y: 295, w: 136, h: 136},
            panda:      {x: 182, y: 671, w: 182, h: 136},
            parrot:     {x: 364, y: 774, w: 137, h: 136},
            penguin:    {x: 354, y: 140, w: 148, h: 136},
            pig:        {x: 353, y: 476, w: 152, h: 136},
            rabbit:     {x: 510, y: 464, w: 137, h: 184},
            rhino:      {x: 191, y: 349, w: 162, h: 136},
            sloth:      {x: 501, y: 774, w: 137, h: 136},
            snake:      {x: 775, y: 753, w: 136, h: 150},
            walrus:     {x: 648, y: 0, w: 136, h: 146},
            whale:      {x: 364, y: 612, w: 146, h: 162},
            zebra:      {x: 777, y: 146, w: 136, h: 149}
        }
    };

    static ITEMS = {

    }

    //for Config.Resources.UIRPGSpriteSheet
    static UI = {
        arrowBeige_left: {x: 303, y: 486, w: 22, h: 21},
        arrowBeige_right: {x: 171, y: 486, w: 22, h: 21},
        arrowBlue_left: {x: 193, y: 486, w: 22, h: 21},
        arrowBlue_right: {x: 215, y: 486, w: 22, h: 21},
        arrowBrown_left: {x: 237, y: 486, w: 22, h: 21},
        arrowBrown_right: {x: 325, y: 486, w: 22, h: 21},
        arrowSilver_left: {x: 281, y: 486, w: 22, h: 21},
        arrowSilver_right: {x: 259, y: 486, w: 22, h: 21},
        barBack_horizontalLeft: {x: 372, y: 330, w: 9, h: 18},
        barBack_horizontalMid: {x: 338, y: 386, w: 18, h: 18},
        barBack_horizontalRight: {x: 190, y: 294, w: 9, h: 18},
        barBack_verticalBottom: {x: 290, y: 189, w: 18, h: 9},
        barBack_verticalMid: {x: 338, y: 404, w: 18, h: 18},
        barBack_verticalTop: {x: 338, y: 440, w: 18, h: 9},
        barBlue_horizontalMid: {x: 356, y: 431, w: 18, h: 18},
        barBlue_horizontalLeft: {x: 372, y: 294, w: 9, h: 18},
        barBlue_horizontalRight: {x: 372, y: 312, w: 9, h: 18},
        barBlue_verticalBottom: {x: 344, y: 189, w: 18, h: 9},
        barBlue_verticalMid: {x: 356, y: 386, w: 18, h: 18},
        barBlue_verticalTop: {x: 356, y: 404, w: 18, h: 9},
        barGreen_horizontalLeft: {x: 370, y: 108, w: 9, h: 18},
        barGreen_horizontalMid: {x: 338, y: 368, w: 18, h: 18},
        barGreen_horizontalRight: {x: 190, y: 312, w: 9, h: 18},
        barGreen_verticalBottom: {x: 338, y: 467, w: 18, h: 9},
        barGreen_verticalMid: {x: 356, y: 413, w: 18, h: 18},
        barGreen_verticalTop: {x: 171, y: 476, w: 18, h: 9},
        barRed_horizontalLeft: {x: 370, y: 90, w: 9, h: 18},
        barRed_horizontalMid: {x: 356, y: 368, w: 18, h: 18},
        barRed_horizontalRight: {x: 190, y: 348, w: 9, h: 18},
        barRed_verticalBottom: {x: 347, y: 503, w: 18, h: 9},
        barRed_verticalMid: {x: 347, y: 485, w: 18, h: 18},
        barRed_verticalTop: {x: 338, y: 476, w: 18, h: 9},
        barYellow_horizontalLeft: {x: 370, y: 126, w: 9, h: 18},
        barYellow_horizontalMid: {x: 338, y: 449, w: 18, h: 18},
        barYellow_horizontalRight: {x: 190, y: 330, w: 9, h: 18},
        barYellow_verticalBottom: {x: 326, y: 189, w: 18, h: 9},
        barYellow_verticalMid: {x: 338, y: 422, w: 18, h: 18},
        barYellow_verticalTop: {x: 308, y: 189, w: 18, h: 9},
        buttonLong_beige: {x: 0, y: 282, w: 190, h: 49},
        buttonLong_beige_pressed: {x: 0, y: 237, w: 190, h: 45},
        buttonLong_blue: {x: 0, y: 188, w: 190, h: 49},
        buttonLong_blue_pressed: {x: 0, y: 143, w: 190, h: 45},
        buttonLong_brown: {x: 0, y: 49, w: 190, h: 49},
        buttonLong_brown_pressed: {x: 0, y: 98, w: 190, h: 45},
        buttonLong_grey: {x: 0, y: 0, w: 190, h: 49},
        buttonLong_grey_pressed: {x: 0, y: 331, w: 190, h: 45},
        buttonRound_beige: {x: 335, y: 76, w: 35, h: 38},
        buttonRound_blue: {x: 335, y: 38, w: 35, h: 38},
        buttonRound_brown: {x: 335, y: 114, w: 35, h: 38},
        buttonRound_grey: {x: 335, y: 0, w: 35, h: 38},
        buttonSquare_beige: {x: 293, y: 294, w: 45, h: 49},
        buttonSquare_beige_pressed: {x: 290, y: 94, w: 45, h: 45},
        buttonSquare_blue: {x: 290, y: 0, w: 45, h: 49},
        buttonSquare_blue_pressed: {x: 290, y: 139, w: 45, h: 45},
        buttonSquare_brown: {x: 293, y: 343, w: 45, h: 49},
        buttonSquare_brown_pressed: {x: 293, y: 392, w: 45, h: 45},
        buttonSquare_grey: {x: 293, y: 437, w: 45, h: 49},
        buttonSquare_grey_pressed: {x: 290, y: 49, w: 45, h: 45},
        cursorGauntlet_blue: {x: 30, y: 482, w: 30, h: 30},
        cursorGauntlet_bronze: {x: 0, y: 482, w: 30, h: 30},
        cursorGauntlet_grey: {x: 60, y: 482, w: 30, h: 30},
        cursorHand_beige: {x: 90, y: 482, w: 27, h: 28},
        cursorHand_blue: {x: 117, y: 482, w: 27, h: 28},
        cursorHand_grey: {x: 144, y: 482, w: 27, h: 28},
        cursorSword_bronze: {x: 338, y: 331, w: 34, h: 37},
        cursorSword_gold: {x: 338, y: 294, w: 34, h: 37},
        cursorSword_silver: {x: 335, y: 152, w: 34, h: 37},
        iconCheck_beige: {x: 369, y: 184, w: 16, h: 15},
        iconCheck_blue: {x: 370, y: 30, w: 16, h: 15},
        iconCheck_bronze: {x: 370, y: 45, w: 16, h: 15},
        iconCheck_grey: {x: 370, y: 75, w: 16, h: 15},
        iconCircle_beige: {x: 356, y: 466, w: 17, h: 17},
        iconCircle_blue: {x: 365, y: 483, w: 17, h: 17},
        iconCircle_brown: {x: 369, y: 152, w: 17, h: 17},
        iconCircle_grey: {x: 356, y: 449, w: 17, h: 17},
        iconCross_beige: {x: 369, y: 169, w: 16, h: 15},
        iconCross_blue: {x: 370, y: 15, w: 16, h: 15},
        iconCross_brown: {x: 370, y: 0, w: 16, h: 15},
        iconCross_grey: {x: 370, y: 60, w: 16, h: 15},
        panelInset_beige: {x: 200, y: 294, w: 93, h: 94},
        panelInset_beigeLight: {x: 190, y: 200, w: 93, h: 94},
        panelInset_blue: {x: 200, y: 388, w: 93, h: 94},
        panelInset_brown: {x: 283, y: 200, w: 93, h: 94},
        panel_beige: {x: 190, y: 100, w: 100, h: 100},
        panel_beigeLight: {x: 100, y: 376, w: 100, h: 100},
        panel_blue: {x: 190, y: 0, w: 100, h: 100},
        panel_brown: {x: 0, y: 376, w: 100, h: 100}
    }

    static MAP = {
        level_empty:    { x: 192, y: 320, w: 64, h: 64 },
        level_01:       { x: 256, y: 320, w: 64, h: 64 },
        level_02:       { x: 256, y: 256, w: 64, h: 64 },
        level_03:       { x: 256, y: 192, w: 64, h: 64 },
        level_04:       { x: 256, y: 128, w: 64, h: 64 },
        level_05:       { x: 256, y: 64, w: 64, h: 64 },
        level_06:       { x: 192, y: 128, w: 64, h: 64 },
        level_07:       { x: 192, y: 64, w: 64, h: 64 },
        level_08:       { x: 192, y: 0, w: 64, h: 64 },
        level_09:       { x: 128, y: 832, w: 64, h: 64 },
        level_10:       { x: 128, y: 768, w: 64, h: 64 },
        level_11:       { x: 64, y: 832, w: 64, h: 64 },
        level_12:       { x: 64, y: 768, w: 64, h: 64 },
        level_13:       { x: 64, y: 704, w: 64, h: 64 },
        level_14:       { x: 64, y: 640, w: 64, h: 64 },
        level_15:       { x: 64, y: 576, w: 64, h: 64 },
        level_16:       { x: 0, y: 640, w: 64, h: 64 },
        level_17:       { x: 0, y: 576, w: 64, h: 64 },
        level_18:       { x: 0, y: 512, w: 64, h: 64 },
        level_19:       { x: 0, y: 448, w: 64, h: 64 },
        level_20:       { x: 0, y: 384, w: 64, h: 64 },
        mapTile_001: { x: 0, y: 192, w: 64, h: 64 },
        mapTile_002: { x: 0, y: 128, w: 64, h: 64 },
        mapTile_003: { x: 0, y: 64, w: 64, h: 64 },
        mapTile_004: { x: 0, y: 0, w: 64, h: 64 },
        mapTile_005: { x: 384, y: 576, w: 64, h: 64 },
        mapTile_006: { x: 832, y: 256, w: 64, h: 64 },
        mapTile_007: { x: 832, y: 192, w: 64, h: 64 },
        mapTile_008: { x: 832, y: 128, w: 64, h: 64 },
        mapTile_009: { x: 832, y: 64, w: 64, h: 64 },
        mapTile_010: { x: 832, y: 0, w: 64, h: 64 },
        mapTile_011: { x: 768, y: 832, w: 64, h: 64 },
        mapTile_012: { x: 768, y: 768, w: 64, h: 64 },
        mapTile_013: { x: 768, y: 704, w: 64, h: 64 },
        mapTile_014: { x: 768, y: 640, w: 64, h: 64 },
        mapTile_015: { x: 768, y: 576, w: 64, h: 64 },
        mapTile_016: { x: 768, y: 512, w: 64, h: 64 },
        mapTile_017: { x: 768, y: 448, w: 64, h: 64 },
        mapTile_018: { x: 768, y: 384, w: 64, h: 64 },
        mapTile_019: { x: 768, y: 320, w: 64, h: 64 },
        mapTile_020: { x: 768, y: 256, w: 64, h: 64 },
        mapTile_021: { x: 768, y: 192, w: 64, h: 64 },
        mapTile_022: { x: 768, y: 128, w: 64, h: 64 },
        mapTile_023: { x: 768, y: 64, w: 64, h: 64 },
        mapTile_024: { x: 768, y: 0, w: 64, h: 64 },
        mapTile_025: { x: 704, y: 832, w: 64, h: 64 },
        mapTile_026: { x: 704, y: 768, w: 64, h: 64 },
        mapTile_027: { x: 704, y: 704, w: 64, h: 64 },
        mapTile_028: { x: 704, y: 640, w: 64, h: 64 },
        mapTile_029: { x: 704, y: 576, w: 64, h: 64 },
        mapTile_030: { x: 704, y: 512, w: 64, h: 64 },
        mapTile_031: { x: 704, y: 448, w: 64, h: 64 },
        mapTile_032: { x: 704, y: 384, w: 64, h: 64 },
        mapTile_033: { x: 704, y: 320, w: 64, h: 64 },
        mapTile_034: { x: 704, y: 256, w: 64, h: 64 },
        cactus:         { x: 704, y: 192, w: 64, h: 64 },
        mapTile_036: { x: 704, y: 128, w: 64, h: 64 },
        mapTile_037: { x: 704, y: 64, w: 64, h: 64 },
        mapTile_038: { x: 704, y: 0, w: 64, h: 64 },
        rock:           { x: 640, y: 832, w: 64, h: 64 },
        tree:           { x: 640, y: 768, w: 64, h: 64 },
        mapTile_041: { x: 640, y: 704, w: 64, h: 64 },
        mapTile_042: { x: 640, y: 640, w: 64, h: 64 },
        mapTile_043: { x: 640, y: 576, w: 64, h: 64 },
        mapTile_044: { x: 640, y: 512, w: 64, h: 64 },
        mapTile_045: { x: 640, y: 448, w: 64, h: 64 },
        mapTile_046: { x: 640, y: 384, w: 64, h: 64 },
        mapTile_047: { x: 640, y: 320, w: 64, h: 64 },
        mapTile_048: { x: 640, y: 256, w: 64, h: 64 },
        mapTile_049: { x: 640, y: 192, w: 64, h: 64 },
        pyramid:         { x: 640, y: 128, w: 64, h: 64 },
        mapTile_051: { x: 640, y: 64, w: 64, h: 64 },
        mapTile_052: { x: 640, y: 0, w: 64, h: 64 },
        mapTile_053: { x: 576, y: 832, w: 64, h: 64 },
        mapTile_054: { x: 576, y: 768, w: 64, h: 64 },
        mapTile_055: { x: 576, y: 704, w: 64, h: 64 },
        mapTile_056: { x: 576, y: 640, w: 64, h: 64 },
        mapTile_057: { x: 576, y: 576, w: 64, h: 64 },
        mapTile_058: { x: 576, y: 512, w: 64, h: 64 },
        dome:           { x: 576, y: 448, w: 64, h: 64 },
        shrooms:        { x: 576, y: 384, w: 64, h: 64 },
        mapTile_061: { x: 576, y: 320, w: 64, h: 64 },
        mapTile_062: { x: 576, y: 256, w: 64, h: 64 },
        mapTile_063: { x: 576, y: 192, w: 64, h: 64 },
        mapTile_064: { x: 576, y: 128, w: 64, h: 64 },
        mapTile_065: { x: 576, y: 64, w: 64, h: 64 },
        mapTile_066: { x: 576, y: 0, w: 64, h: 64 },
        mapTile_067: { x: 512, y: 832, w: 64, h: 64 },
        mapTile_068: { x: 512, y: 768, w: 64, h: 64 },
        mapTile_069: { x: 512, y: 704, w: 64, h: 64 },
        mapTile_070: { x: 512, y: 640, w: 64, h: 64 },
        mapTile_071: { x: 512, y: 576, w: 64, h: 64 },
        mapTile_072: { x: 512, y: 512, w: 64, h: 64 },
        mapTile_073: { x: 512, y: 448, w: 64, h: 64 },
        mapTile_074: { x: 512, y: 384, w: 64, h: 64 },
        mapTile_075: { x: 512, y: 320, w: 64, h: 64 },
        mapTile_076: { x: 512, y: 256, w: 64, h: 64 },
        mapTile_077: { x: 512, y: 192, w: 64, h: 64 },
        mapTile_078: { x: 512, y: 128, w: 64, h: 64 },
        mapTile_079: { x: 512, y: 64, w: 64, h: 64 },
        mapTile_080: { x: 512, y: 0, w: 64, h: 64 },
        mapTile_081: { x: 448, y: 832, w: 64, h: 64 },
        mapTile_082: { x: 448, y: 768, w: 64, h: 64 },
        mapTile_083: { x: 448, y: 704, w: 64, h: 64 },
        mapTile_084: { x: 448, y: 640, w: 64, h: 64 },
        mapTile_085: { x: 448, y: 576, w: 64, h: 64 },
        mapTile_086: { x: 448, y: 512, w: 64, h: 64 },
        mapTile_087: { x: 448, y: 448, w: 64, h: 64 },
        mapTile_088: { x: 448, y: 384, w: 64, h: 64 },
        mapTile_089: { x: 448, y: 320, w: 64, h: 64 },
        mapTile_090: { x: 448, y: 256, w: 64, h: 64 },
        mapTile_091: { x: 448, y: 192, w: 64, h: 64 },
        mapTile_092: { x: 448, y: 128, w: 64, h: 64 },
        mapTile_093: { x: 448, y: 64, w: 64, h: 64 },
        snowman:        { x: 448, y: 0, w: 64, h: 64 },
        igloo:          { x: 384, y: 832, w: 64, h: 64 },
        mapTile_096: { x: 384, y: 768, w: 64, h: 64 },
        mapTile_097: { x: 384, y: 704, w: 64, h: 64 },
        mapTile_098: { x: 384, y: 640, w: 64, h: 64 },
        mapTile_099: { x: 832, y: 320, w: 64, h: 64 },
        tower:          { x: 384, y: 512, w: 64, h: 64 },
        castle:         { x: 384, y: 448, w: 64, h: 64 },
        mapTile_102: { x: 384, y: 384, w: 64, h: 64 },
        mapTile_103: { x: 384, y: 320, w: 64, h: 64 },
        mushroom_red:   { x: 384, y: 256, w: 64, h: 64 },
        mushroom_brown: { x: 384, y: 192, w: 64, h: 64 },
        mapTile_106: { x: 384, y: 128, w: 64, h: 64 },
        mapTile_107: { x: 384, y: 64, w: 64, h: 64 },
        mapTile_108: { x: 384, y: 0, w: 64, h: 64 },
        mapTile_109: { x: 320, y: 832, w: 64, h: 64 },
        snowy_tree:     { x: 320, y: 768, w: 64, h: 64 },
        mapTile_111: { x: 320, y: 704, w: 64, h: 64 },
        mapTile_112: { x: 320, y: 640, w: 64, h: 64 },
        mapTile_113: { x: 320, y: 576, w: 64, h: 64 },
        coin_box:       { x: 320, y: 512, w: 64, h: 64 },
        mapTile_115: { x: 320, y: 448, w: 64, h: 64 },
        mapTile_116: { x: 320, y: 384, w: 64, h: 64 },
        mapTile_117: { x: 320, y: 320, w: 64, h: 64 },
        mapTile_118: { x: 320, y: 256, w: 64, h: 64 },
        mapTile_119: { x: 320, y: 192, w: 64, h: 64 },
        mapTile_120: { x: 320, y: 128, w: 64, h: 64 },
        mapTile_121: { x: 320, y: 64, w: 64, h: 64 },
        mapTile_122: { x: 320, y: 0, w: 64, h: 64 },
        mapTile_123: { x: 256, y: 832, w: 64, h: 64 },
        mapTile_124: { x: 256, y: 768, w: 64, h: 64 },
        mapTile_125: { x: 256, y: 704, w: 64, h: 64 },
        mapTile_126: { x: 256, y: 640, w: 64, h: 64 },
        mapTile_127: { x: 256, y: 576, w: 64, h: 64 },
        mapTile_128: { x: 256, y: 512, w: 64, h: 64 },
        mapTile_129: { x: 256, y: 448, w: 64, h: 64 },
        mapTile_130: { x: 256, y: 384, w: 64, h: 64 },
        alien_green:    { x: 256, y: 0, w: 64, h: 64 },
        alien_blue:     { x: 192, y: 832, w: 64, h: 64 },
        mapTile_138: { x: 192, y: 768, w: 64, h: 64 },
        mapTile_139: { x: 192, y: 704, w: 64, h: 64 },
        mapTile_140: { x: 192, y: 640, w: 64, h: 64 },
        mapTile_141: { x: 192, y: 576, w: 64, h: 64 },
        mapTile_142: { x: 192, y: 512, w: 64, h: 64 },
        mapTile_143: { x: 192, y: 448, w: 64, h: 64 },
        mapTile_144: { x: 192, y: 384, w: 64, h: 64 },
        mapTile_146: { x: 192, y: 256, w: 64, h: 64 },
        mapTile_147: { x: 192, y: 192, w: 64, h: 64 },
        alien_red:      { x: 128, y: 704, w: 64, h: 64 },
        alien_yellow:   { x: 128, y: 640, w: 64, h: 64 },
        mapTile_155: { x: 128, y: 576, w: 64, h: 64 },
        mapTile_156: { x: 128, y: 512, w: 64, h: 64 },
        mapTile_157: { x: 128, y: 448, w: 64, h: 64 },
        mapTile_158: { x: 128, y: 384, w: 64, h: 64 },
        mapTile_159: { x: 128, y: 320, w: 64, h: 64 },
        mapTile_160: { x: 128, y: 256, w: 64, h: 64 },
        mapTile_161: { x: 128, y: 192, w: 64, h: 64 },
        mapTile_162: { x: 128, y: 128, w: 64, h: 64 },
        mapTile_163: { x: 128, y: 64, w: 64, h: 64 },
        mapTile_164: { x: 128, y: 0, w: 64, h: 64 },
        alien_brown:    { x: 64, y: 512, w: 64, h: 64 },
        mapTile_171: { x: 64, y: 448, w: 64, h: 64 },
        mapTile_172: { x: 64, y: 384, w: 64, h: 64 },
        mapTile_173: { x: 64, y: 320, w: 64, h: 64 },
        mapTile_174: { x: 64, y: 256, w: 64, h: 64 },
        mapTile_175: { x: 64, y: 192, w: 64, h: 64 },
        mapTile_176: { x: 64, y: 128, w: 64, h: 64 },
        mapTile_177: { x: 64, y: 64, w: 64, h: 64 },
        mapTile_178: { x: 64, y: 0, w: 64, h: 64 },
        mapTile_179: { x: 0, y: 832, w: 64, h: 64 },
        mapTile_180: { x: 0, y: 768, w: 64, h: 64 },
        mapTile_181: { x: 0, y: 704, w: 64, h: 64 },
        mapTile_187: { x: 0, y: 320, w: 64, h: 64 },
        mapTile_188: { x: 0, y: 256, w: 64, h: 64 }
    };

    static AQUARIUM = {
        BIG: {
            w: 226, h: 210
        },
        SMALL: {
            w: 226, h: 146
        }
    }
}
