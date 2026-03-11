"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const lbsPerKg = 2.2046226218;
const cmPerIn = 2.54;

export function UnitConverter() {
  const [kg, setKg] = useState("");
  const [lbs, setLbs] = useState("");
  const [cm, setCm] = useState("");
  const [ft, setFt] = useState("");
  const [inch, setInch] = useState("");

  const kgNum = Number(kg);
  const lbsNum = Number(lbs);
  const cmNum = Number(cm);
  const ftNum = Number(ft);
  const inNum = Number(inch);

  const computed = useMemo(() => {
    const fromKg = Number.isFinite(kgNum) ? kgNum * lbsPerKg : NaN;
    const fromLbs = Number.isFinite(lbsNum) ? lbsNum / lbsPerKg : NaN;

    const fromCmTotalIn = Number.isFinite(cmNum) ? cmNum / cmPerIn : NaN;
    const fromCmFt = Number.isFinite(fromCmTotalIn) ? Math.floor(fromCmTotalIn / 12) : NaN;
    const fromCmIn = Number.isFinite(fromCmTotalIn) ? fromCmTotalIn - (fromCmFt * 12) : NaN;

    const totalIn = (Number.isFinite(ftNum) ? ftNum * 12 : 0) + (Number.isFinite(inNum) ? inNum : 0);
    const fromFtInCm = totalIn ? totalIn * cmPerIn : NaN;

    return { fromKg, fromLbs, fromCmFt, fromCmIn, fromFtInCm };
  }, [kgNum, lbsNum, cmNum, ftNum, inNum]);

  return (
    <div className="grid gap-3">
      <Card>
        <p className="font-medium">Weight</p>
        <div className="mt-2 grid gap-2 md:grid-cols-2">
          <Input value={kg} onChange={(e) => setKg(e.target.value)} placeholder="kg" />
          <Input
            value={Number.isFinite(computed.fromKg) ? computed.fromKg.toFixed(1) : ""}
            readOnly
            placeholder="lbs"
          />
          <Input value={lbs} onChange={(e) => setLbs(e.target.value)} placeholder="lbs" />
          <Input
            value={Number.isFinite(computed.fromLbs) ? computed.fromLbs.toFixed(1) : ""}
            readOnly
            placeholder="kg"
          />
        </div>
      </Card>

      <Card>
        <p className="font-medium">Height</p>
        <div className="mt-2 grid gap-2 md:grid-cols-3">
          <Input value={cm} onChange={(e) => setCm(e.target.value)} placeholder="cm" />
          <Input
            value={Number.isFinite(computed.fromCmFt) ? String(computed.fromCmFt) : ""}
            readOnly
            placeholder="ft"
          />
          <Input
            value={Number.isFinite(computed.fromCmIn) ? computed.fromCmIn.toFixed(1) : ""}
            readOnly
            placeholder="in"
          />
        </div>

        <div className="mt-2 grid gap-2 md:grid-cols-3">
          <Input value={ft} onChange={(e) => setFt(e.target.value)} placeholder="ft" />
          <Input value={inch} onChange={(e) => setInch(e.target.value)} placeholder="in" />
          <Input
            value={Number.isFinite(computed.fromFtInCm) ? computed.fromFtInCm.toFixed(1) : ""}
            readOnly
            placeholder="cm"
          />
        </div>
      </Card>
    </div>
  );
}
