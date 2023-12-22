import { useCallback, useMemo } from "react";

const Avatar = ({ firstname, lastname }: any) => {
  const generateRandomColorNumber = useCallback(() => {
    let randomHue = Math.floor(Math.random() * 360);
    return randomHue;
  }, [firstname, lastname]);

  const generatePlaceholderName = useCallback(
    (firstname: string, lastname?: string) => {
      return firstname && lastname
        ? firstname?.charAt(0).toUpperCase() + lastname?.charAt(0).toUpperCase()
        : "JR";
    },
    [firstname, lastname]
  );

  const avatarPlaceholder = useMemo(
    () => generatePlaceholderName(firstname, lastname),
    [firstname, lastname]
  );
  const placeholderBackground = useMemo(
    () => `hsl(${generateRandomColorNumber()}, 50% , 50%)`,
    [firstname, lastname]
  );
  return (
    <div
      style={{
        backgroundColor: placeholderBackground,
      }}
      className="!rounded-full w-12 h-12 flex justify-center items-center "
    >
      <p className="text-white font-semibold"> {avatarPlaceholder}</p>
    </div>
  );
};

export default Avatar;
