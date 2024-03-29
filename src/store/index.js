import { configureStore, createSlice } from "@reduxjs/toolkit";
import calculate from "./calculate";
const calculateState = {
  result: null,
  operator: null,
  firstValue: null,
  value: 0,
  generalProcess: "",
  waitingSecondNumber: false,
};
const calculateSlice = createSlice({
  name: "calculate",
  initialState: calculateState,
  reducers: {
    //! Aritmetik operatörlerden birine tıklandığında yapılacak işlevler
    handleOpr(state, action) {
      const operators = ["+", "*", "/", "-"];
      const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      //! Eğer bir işlem yapıldıysa daha önceden sonucu üzerinden işlemlere devam...
      //! edilir .
      if (state.result !== null) {
        state.generalProcess = state.result.toString();
        state.firstValue = state.result;
        state.result = null;
      }
      //! Eğer ilk kez işlem yapılıyorsa
      if (state.operator === null) {
        //! Resetlenmiş halinde eğer "-" ye basılırsa ikinci değer bekleme...
        //! Ve operatoru saklama."-8+4" gibi işlemde başta "-" yazıldığında ...
        //! Operatörü kaydetmemiş oluruz boylelikle.
        state.waitingSecondNumber = state.firstValue === null ? false : true;
        state.operator = state.firstValue === null ? null : action.payload.opr;
        //! Operatoru ekrana yaz
        state.value = action.payload.opr;
        state.generalProcess = state.generalProcess + action.payload.opr;
        //! Eğer ilk değer yoksa(yani ilk kez işlem yapılıyorsa) yapılacak işlemler
        if (state.firstValue === null) {
          //! Eğer tıklanan operator "-" ise ve önceki işaret de "-" ise bir daha eksi yazmaz
          if (action.payload.opr === "-" && state.value === "-") {
            state.generalProcess = action.payload.opr;
          }
          //! Diğer operatorlere tıklanıldıgı takdirde ekrana yazdırmaz
          else {
            state.value = 0;
            state.generalProcess = "";
          }
        }
      }
      //! Eğer ardı ardına ikinci operator eklenicek ise yada ikinci bir işlem
      //! yapılacak ise ("6-7+2" gibi)
      else {
        //! Eğer "-" dışında bir operatore tıklanmışsa
        if (action.payload.opr !== "-") {
          //! Önceki değer "-" ise
          if (state.generalProcess[state.generalProcess.length - 1] === "-") {
            //! Eğer ardı ardına yazılmış iki operator varsa ...
            //! bu operatorler yeni eklenen operator ile guncellenir.
            //! "+-" ,"*" tıklandı, "+-" ile "*" değiştirilir.
            if (
              operators.some((opr) => opr === state.generalProcess.slice(-2)[0])
            ) {
              state.generalProcess =
                state.generalProcess.substring(
                  0,
                  state.generalProcess.length - 2
                ) + action.payload.opr;
            }
            //! Eğerki "-" yazılı iken "-" harici bir operatore tıklanırsa...
            //! Bu operator ile guncellenir.
            //! "89-" iken "*" ya basılırsa "89*" olur
            else {
              state.generalProcess =
                state.generalProcess.substring(
                  0,
                  state.generalProcess.length - 1
                ) + action.payload.opr;
            }
          }
          //! Önceki değer "-" değilse
          else {
            //! ve onceki değer bir ("-" dısında) operator ise
            if (
              operators.some(
                (opr) =>
                  opr === state.generalProcess[state.generalProcess.length - 1]
              )
            ) {
              //! Tıklanan operator ile değiştirilir
              //! "89+" iken "*" basılırsa "89*" olur
              state.generalProcess =
                state.generalProcess.substring(
                  0,
                  state.generalProcess.length - 1
                ) + action.payload.opr;
            }
            //! Operator değilse operatoru tıklanan operatoru ekler.
            else {
              state.generalProcess = state.generalProcess + action.payload.opr;
            }
          }
        }
        //! Eğerki "-" ye tıklanmışsa
        else {
          //! Sondan ikinci karakter operatörler listesinde bir operatör değilse veya
          //! Son  karakter sayı ise
          if (
            !operators.some(
              (opr) => opr === state.generalProcess.slice(-2)[0]
            ) ||
            numbers.some(
              (number) => number === state.generalProcess.slice(-2)[1]
            )
          ) {
            //! Onceki 2 değer  "--" ise durumunu korur değilse operatoru ekler.
            state.generalProcess =
              state.generalProcess.slice(-2) === "--"
                ? state.generalProcess
                : state.generalProcess + action.payload.opr;
          }
        }
        state.value = action.payload.opr;
      }
    },
    //! Sayılardan birine tıklandığında yapılacak işlevler
    handleNumber(state, action) {
      const operators = ["+", "-", "*", "/"];
      //! Eğer daha önce bir işlem yapılmışsa ve sonuç varsa ekranda...
      //!  ekranı sıfırlar.
      if (state.result !== null) {
        Object.assign(state, calculateState);
      }
      //! Eğer ikinci değer beklenmiyorsa yazılan sayıları ardı ardına ekler..
      if (!state.waitingSecondNumber) {
        state.value =
          state.value === 0
            ? action.payload.value
            : state.value.toString() + action.payload.value.toString();
        state.generalProcess = state.value;
        state.firstValue = state.generalProcess;
      }
      //! Eğerki değer bekleniyorsa yani aritmetik operatorlerden sonra ...
      //! sayı yazılmaya başlandıysa
      else {
        //! Çift operator "--,+-,/-,*-" gibi durumda state value su "-" olarak kalıyor.
        //! Bu durum varsa state value temizleniyor.
        if (
          state.value.length === 1 &&
          operators.some((opr) => opr === state.value[0])
        ) {
          state.value = "";
        }
        //! 0 daha once varsa tekrar 0 a basılırsa 0 degerini yazmaz ...
        //! yani "6-00" gibi bir durumu engeller
        if (action.payload.value === 0 && state.value === "0") {
          state.value = action.payload.value.toString();
        }
        //! eğer 0 dışında başka rakama basılırsa ve ekranda 0 varsa
        //! bu sıfırı basılan sayı ile değiştirir.
        if (state.value === "0") {
          state.value = "";
          state.value = action.payload.value.toString();
          state.generalProcess =
            state.generalProcess.substring(0, state.generalProcess.length - 1) +
            action.payload.value.toString();
        }
        //! Eğer ekranda 0 yoksa başka rakam varsa yeni sayıyı yanına ekler
        else {
          state.value =
            state.value.toString() + action.payload.value.toString();
          state.generalProcess =
            state.generalProcess + action.payload.value.toString();
        }
      }
    },
    //! Eşittir butonuna tıklandığında yapılacak işlemler
    calculate(state) {
      //! Eşitlik yoksa işlemi işlemi yap
      if (!state.generalProcess.includes("=")) {
        const result = calculate(
          state.generalProcess.replace("--", "+-").replace("+-", "-")
        );

        state.generalProcess += `=${result}`;
        state.value = result.toString();
        state.result = result;
      }
    },
    //! "." butonuna tıklandığında yapılacak işlevler
    handleDecimal(state) {
      //! Eğer bir işlem yapılmışssa daha onceden ve ekranda bir sonuç varsa ...
      //! Önce bu sonucu sıfırlar sonra ekrana "0." şeklinde değer yazdırır.
      if (state.result !== null) {
        Object.assign(state, calculateState);
        state.value = "0.";
        state.generalProcess = "0.";
      }
      //! "8.." gibi durumları engeller
      if (state.value[state.value.length - 1] === ".") {
        return;
      }
      //! "8.9" daki gibi "." içeririyorsa işlemi yapma
      else {
        if (!state.value.toString().includes(".")) {
          state.value += ".";
          state.generalProcess += ".";
        }
      }
    },
    //! AC Butonuna tıklandığında ekranın temizlenmesi işlevini yapar.
    clear(state) {
      Object.assign(state, calculateState);
    },
  },
});

const store = configureStore({
  reducer: calculateSlice.reducer,
});
export const calculateActions = calculateSlice.actions;
export default store;
