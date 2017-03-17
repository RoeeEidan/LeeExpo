// function SingleState(state){
//     const Copy= Object.create(state)
//     console.log({Copy})
//     this.StatesArray=state.NewState.StatesArray,
//     this.Display=state.NewState.Display,
//     this.ChefsBoard=state.NewState.ChefsBoard,
//     this.ThisOrder=state.NewState.ThisOrder,
//     this.Allergy=state.NewState.Allergy,
//     this.TableNumber=state.NewState.TableNumber
// }
// function MakeNewStateArray(State){
//     console.log(State.NewState);
//     console.log(State.NewState.StatesArray)
//     const MyArr = State.NewState.StatesArray;
//     this.StatesArray = MyArr;
//     const NewEntry = new SingleState(State);
//     this.StatesArray.push(NewEntry);
//     console.log(this.StatesArray)
//         return this.StatesArray;
// };
// export {MakeNewStateArray , SingleState}