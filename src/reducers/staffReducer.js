

const initialState = [
    {
        id: 1,
        name: "Walter Cosani",
        img: "./img/cosani.jpg"
    },
    {
        id: 2,
        name: "Ignacio Truffa",
        img: "./img/truffa.jpg"
    },
    {
        id: 3,
        name: "John Doe",
        img: "./img/truffa.jpg"
    }
]

export const staffReducer = (state = initialState, action) => {

    switch( action.type ) {
        default:
            return state;
    }
}