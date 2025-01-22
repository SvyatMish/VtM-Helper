import React from "react";
import { Button } from "@mui/material";
import { useFieldArray } from "react-hook-form";

import { Character, Attribute, SetCharValue, CharControl } from "../types";
import { AttributeSelect } from "./attribute-select";
import { RHInput } from "../../../components/inputs";
import { getBonusString } from "../utils";

export const AttacksBlock: React.FC<{
  setValue: SetCharValue;
  getAttackBonus(a: Attribute): { attack: number; damage: number };
  attacks: Character["attacks"];
  control: CharControl;
}> = ({ getAttackBonus, control, attacks }) => {
  const { fields, append, remove } = useFieldArray<Character>({
    name: "attacks",
    control,
  });
  const add = () => {
    append({ name: "Новая атака", damage: "0", attribute: "strength" });
  };

  return (
    <div className="p-3 border h-fit space-y-2">
      {fields.map((attack, index) => {
        const name = `attacks.${index}`;
        return (
          <div
            key={attack.name}
            className="grid grid-cols-[200px_50px_150px_70px_64px] items-end"
          >
            <RHInput label="Название" control={control} name={`${name}.name`} />
            <RHInput label="Урон" control={control} name={`${name}.damage`} />
            <AttributeSelect
              label="Хар."
              control={control}
              name={`${name}.attribute`}
            />
            <div className="flex flex-col">
              <div>
                {getBonusString(
                  getAttackBonus(attacks[index].attribute).damage
                )}{" "}
                урон
              </div>
              <div>
                {getBonusString(
                  getAttackBonus(attacks[index].attribute).attack
                )}{" "}
                атака
              </div>
            </div>
            <Button
              onClick={() => {
                remove(index);
              }}
            >
              -
            </Button>
          </div>
        );
      })}
      <div className="flex justify-end">
        <Button className="justify-self-end" onClick={add}>
          +
        </Button>
      </div>
    </div>
  );
};
