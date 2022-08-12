import { BigNumber } from "ethers";

const RenderResult = ({ result }: { result: any }) => {
  if (Array.isArray(result)) {
    return (
      <div>
        {result.map((r, i) => (
          <div key={i}>{r}</div>
        ))}
      </div>
    );
  }

  if (
    typeof result === "string" ||
    typeof result === "number" ||
    typeof result === "boolean"
  ) {
    return <div>{`${result}`}</div>;
  }

  if (BigNumber.isBigNumber(result)) {
    return <div>{result.toString()}</div>;
  }

  return null;
};

export function ResultCard({ result }: { result: any }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
      <RenderResult result={result} />
    </div>
  );
}
