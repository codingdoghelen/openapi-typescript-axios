import "./App.css";
import api from "./api";
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

  // const pets = new PetApi();
  // const postPetLulu = { name: "lulu", photoUrls: [] } as Pet;
  // const pet = pets.getPetById(1);
  // const postPetAdd = pets.addPet(postPetLulu);
  // const postPet2 = pets.addPet({ name: "lulu", photoUrls: [] });

  // console.log("pet:", pet);
  // console.log("postPetAdd:", postPetAdd);
  // console.log("postPet2:", postPet2);

  const { data: users, isLoading, error } = query;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error!</p>;
  }
  if (!isLoading) {
    // const pets = new PetApi();
    // const postPetLulu = { name: "lulu", photoUrls: [] } as Pet;
    // const pet = pets.getPetById(1);
    // const postPetAdd = pets.addPet(postPetLulu);
    // // const postPet2 = pets.addPet({ name: "lulu", photoUrls: [] });

    // console.log("pet:", pet);
    // console.log("postPetAdd:", postPetAdd);
    // console.log("postPet2:", postPet2);
    const pets = new PetApi();
    console.log("Get getPetwithId:", pets.getPetById(1));
    console.log(
      "Post petAdd:",
      pets.addPet({
        id: 8102,
      } as Pet)
    );
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
