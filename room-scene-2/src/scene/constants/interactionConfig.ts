import { Entity } from "@dcl/sdk/ecs"

export const entityNames = [
    'obj_bench01',
    'obj_bench02',
    'obj_bench04',
    'obj_puffer',
    'obj_chair',
    'obj_seat01',
    'obj_seat03',
]

export const entityStartIndex = [
    {startIndex: 10, modelname: 'obj_pill'},
    
    {startIndex: 2, modelname: 'obj_bench02'},

    {startIndex: 4, modelname: 'obj_bench04'},

    {startIndex: 3, modelname: 'obj_sofa'},
    {startIndex: 5, modelname: 'obj_sofa'},
    {startIndex: 6, modelname: 'obj_sofa'},
    {startIndex: 7, modelname: 'obj_sofa'},
    {startIndex: 12, modelname: 'obj_sofa'},

    {startIndex: 9, modelname: 'obj_seat03'},
    {startIndex: 11, modelname: 'obj_seat03'},
    {startIndex: 12, modelname: 'obj_seat03'},    
    {startIndex: 13, modelname: 'obj_seat03'},
    
    {startIndex: 1, modelname: 'obj_puffer'},
    {startIndex: 5, modelname: 'obj_puffer'},
    {startIndex: 7, modelname: 'obj_puffer'},
    {startIndex: 10, modelname: 'obj_puffer'},

    {startIndex: 10, modelname: 'obj_seat01'},

    {startIndex: 10, modelname: 'obj_chair'},
]

export const pufferList: Map<Entity, string> = new Map([])

export const animation = 'models/Tired.glb'