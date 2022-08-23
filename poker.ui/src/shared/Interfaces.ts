export interface missionMapI {
    name: string,
    field: string,
    target: number, 
    current: number,
    xp: number
}

export interface missionMapDisplayI {
    name: string,
    position: number,
    progressbar: string,
    current: number,
    target: number,
    xp: number
}
