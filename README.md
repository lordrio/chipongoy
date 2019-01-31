# chipongoy
unity tiny play around

# todo


## road map
- scene manager & scene changing + cleanup (waypoint achieved)
- local map
- world map
- player
- world object (player placable)
    - interactable
    - solid
- world object (world item)
    - interactable
    - solid
    e.g. ore deposits, trees etc
- npc (?) this one is done by serverside
- other characters (online mode)
- UI system
    - steal custom button from match3
    - uiwindow system
- networking

## scene manager
- need to set an enitty to keep track all the entity group that have loaded.
- clean up all the entity group
- mutable can be saved in configuration (but i guess it can be save in entity too as long that entity doesnt get destroyed)
    - aka manager entity

## local map
- grid based
- unlinked from player+camera
- multiple layer
    - base layer
    - object layer
    - ((player layer)) (which is not control by localmap)
    - overhead layer
- grid boundry
- grid simple collision course
>> networking system
    - update server if action taken to map
    - recv data from server => pooling
    - load full map from server
>> map data
    - x,y position
    - layer data
    - world object


## player
- player and camera is linked
- mouseclick/wasd move the charater + camera