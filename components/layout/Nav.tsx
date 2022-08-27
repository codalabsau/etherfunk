import { CurrencyDollarIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { ContractContext } from "../../contexts/ContractContext";
import { Input } from "../common/form/Input";

const NavItem = ({
  href,
  selected,
  children,
}: {
  href: string;
  selected: boolean;
  children: JSX.Element;
}) => {
  return (
    <Link href={href} shallow>
      <a
        className={`"mb-1 px-2 py-1  text-sm  hover:underline rounded-md mb-1 " ${
          selected
            ? "bg-slate-200 hover:bg-slate-300 text-slate-900"
            : "hover:bg-slate-100 text-slate-700"
        }`}
      >
        {children}
      </a>
    </Link>
  );
};

export default function Nav() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { contractAddress, currentFunction, functions } =
    useContext(ContractContext);

  const filteredFunctions =
    functions?.filter((f) =>
      f.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? [];

  const readFunctions = filteredFunctions.filter(
    (f: any) => f.stateMutability === "view"
  );
  const writeFunctions = filteredFunctions.filter(
    (f: any) => f.stateMutability === "nonpayable"
  );
  const payableFunctions = filteredFunctions.filter(
    (f: any) => f.stateMutability === "payable"
  );

  return (
    <>
      <div className="mb-7 px-2">
        <label htmlFor="search" className="sr-only">
          Search functions
        </label>
        <div className="mb-3">
          <Input
            type="search"
            name="search"
            id="search"
            placeholder="Search functions"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div>
        <div className="mb-5">
          <div className="text-slate-900 px-2 uppercase tracking-wide text-xs font-bold mb-2">
            Read
          </div>
          <div className="flex flex-col">
            {readFunctions.map((readFunction: any, idx: number) => {
              return (
                <NavItem
                  href={`/address/${contractAddress}?fn=${readFunction.name}`}
                  key={`${readFunction.name}-${idx}`}
                  selected={currentFunction?.name === readFunction.name}
                >
                  {readFunction.name}
                </NavItem>
              );
            })}
            {readFunctions.length === 0 && (
              <div className="text-slate-500 text-sm px-2">
                No read functions.
              </div>
            )}
          </div>
        </div>

        <div className="mb-2">
          <div className="text-slate-900 uppercase tracking-wide text-xs px-2 font-bold mb-2">
            Write
          </div>

          <div className="flex flex-col">
            {writeFunctions.map((writeFunction: any, idx: number) => {
              return (
                <NavItem
                  href={`/address/${contractAddress}?fn=${writeFunction.name}`}
                  key={`${writeFunction.name}-${idx}`}
                  selected={currentFunction?.name === writeFunction.name}
                >
                  {writeFunction.name}
                </NavItem>
              );
            })}
            {payableFunctions.map((payableFunction: any, idx: number) => {
              return (
                <NavItem
                  href={`/address/${contractAddress}?fn=${payableFunction.name}`}
                  key={`${payableFunction.name}-${idx}`}
                  selected={currentFunction?.name === payableFunction.name}
                >
                  <span className="flex items-center">
                    {payableFunction.name}
                    <CurrencyDollarIcon className="ml-1 h-4 w-4 text-slate-400" />
                  </span>
                </NavItem>
              );
            })}
            {writeFunctions.length === 0 && payableFunctions.length === 0 && (
              <div className="text-slate-500 text-sm px-2">
                No write functions.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
