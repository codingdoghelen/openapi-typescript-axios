import "./App.css";
import api from "./api";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Users } from "./api/users";
import { useTranslation } from "react-i18next";
import { Pet, PetApi } from "./generated-sources/openapi/api";

function App() {
  const { t, i18n } = useTranslation();

  const query = useQuery("users", async () => {
    const response = await api.get<Users>("/users");
    return response.data.data;
  });

  const { data: users, isLoading, error } = query;

  useEffect(() => {
    if (!isLoading) {
      const pets = new PetApi();
      console.log(
        "Post petAdd:",
        pets.addPet({
          id: 8102,
        } as Pet)
      );

      console.log("Get getPetwithId:", pets.getPetById(8102));
      console.log(
        "Put updatePet:",
        pets.updatePet({
          id: 8102,
          name: "testing",
        } as Pet)
      );
      console.log("Delete deletePet:", pets.deletePet(8102));
    }
  }, [isLoading]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error!</p>;
  }

  return (
    <div>
      <div>i18next {t("test")}</div>
      <div>Language code: {i18n.language}</div>
      <button onClick={() => i18n.changeLanguage("zh")}>{t("chinese")}</button>
      <button onClick={() => i18n.changeLanguage("en")}>{t("english")}</button>
      {users?.map((user) => {
        return (
          <div key={user.id}>
            <h1>{`${user.first_name} ${user.last_name.toUpperCase()}`}</h1>
            <img src={user.avatar} alt={user.first_name} />
            <p>{user.email}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
