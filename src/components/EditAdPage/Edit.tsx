import { useParams } from "react-router-dom";
import { Car } from "../../../types";
import { SellOrEditPage } from "../SellPage/Sell";
import { useState, useEffect } from "react";
import { collection, db, doc, getDoc } from "../../firebase";

export const Edit = () => {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    const CarsRef = collection(db, "cars");

    const getCarFromDB = async () => {
      const carDoc = await getDoc(doc(CarsRef, id));
      if (carDoc.exists()) {
        setCar(carDoc.data() as Car);
      }
    };
    getCarFromDB();
  }, [id]);

  return id && car ? (
    <SellOrEditPage
      isSellPage={false}
      carDefault={car}
      id={id}
      updateDefaultCar={setCar}
    />
  ) : (
    <h1
      style={{
        textAlign: "center",
        marginTop: "10vh",
        fontSize: "5rem",
        color: "var(--light-red)",
      }}
    >
      Not Found
    </h1>
  );
};
