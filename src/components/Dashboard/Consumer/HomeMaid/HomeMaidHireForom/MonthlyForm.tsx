"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomSelect from "@/components/Reusable/CustomSelect";
import { CustomDropdown } from "@/components/Reusable/CustomDropdown";
import CustomInput from "@/components/Reusable/CustomInput";
import {
  childAgeOptions,
  childCareHoursOptions,
  cookingOptions,
  cookingPerDayOptions,
  getSelectedTimes,
  monthDateOptions,
  TFormValues,
  timeOptionsMap,
  trialOptions,
  washingFrequencyOptions,
} from "./form.utils";
import CustomCheckbox from "@/components/Reusable/CustomCheckbox";
import { AlertCircle, Info } from "lucide-react";
import { CustomDateAndTimeSelector } from "@/components/Reusable/CustomDateAndTimeSelector";
import CustomTextArea from "@/components/Reusable/CustomTextArea";
import { Button } from "@/components/ui/button";
import { useApplyForHomeMaidMutation } from "@/redux/features/home.maid.feature";
import { useAlert } from "@/components/Reusable/AlertModal";

const MonthlyForm = () => {
  const [clothesWashing, setClothesWashing] = useState(false);
  const [toiletCleaning, setToiletCleaning] = useState(false);
  const [childCare, setChildCare] = useState(false);
  const [totalBill, setTotalBill] = useState(0);
  type TFreeTrailTime = "morning" | "afternoon" | "night" | "";
  const [trialTimeSlot, setTrialTimeSlot] = useState<TFreeTrailTime>("");
  const [mutateAsync, { isLoading }] = useApplyForHomeMaidMutation();
  const { showAlert } = useAlert();
  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValues>({
    defaultValues: {
      timesPerDay: "1",
      cookingTime: "morning",
    },
  });

  const timesPerDay = watch("timesPerDay");
  const cookingTimes = watch("cookingTime");
  const clothesWashingFreq = watch("clothWashing");
  const cleaningToiletFreq = watch("cleaningToilet");
  const childCareHours = watch("childcareHour");
  const freeTrailDate = watch("freeTrailDate");
  const selectedTimes = getSelectedTimes(cookingTimes);
  const extraServiceData = {
    washingClothPerson: 500,
    toiletWashing: 250,
    childCare: 300,
  };

  useEffect(() => {
    let total = 0;

    // 🍳 Cooking charge
    if (Number(timesPerDay) === 1) total += 500;
    else if (Number(timesPerDay) === 2) total += 1000;
    else if (Number(timesPerDay) === 3) total += 1500;

    // 👕 Cloth washing
    if (clothesWashingFreq) {
      total += Number(clothesWashingFreq) * extraServiceData.washingClothPerson;
    }

    // // 🚽 Toilet cleaning
    if (cleaningToiletFreq) {
      total += Number(cleaningToiletFreq) * extraServiceData.toiletWashing;
    }

    // // 👶 Child care
    if (childCareHours) {
      total += Number(childCareHours) * extraServiceData.childCare;
    }
    if (freeTrailDate && trialTimeSlot) {
      total += 100;
    }

    setTotalBill(total);
  }, [
    timesPerDay,
    clothesWashingFreq,
    cleaningToiletFreq,
    childCareHours,
    freeTrailDate,
    selectedTimes,
    extraServiceData.childCare,
    extraServiceData.toiletWashing,
    extraServiceData.washingClothPerson,
    trialTimeSlot,
  ]);

  const onSubmit = async (data: TFormValues) => {
    if (data.clothWashing) {
      data.clothWashingAmount =
        Number(data.clothWashing) * extraServiceData.washingClothPerson;
    }

    if (data.cleaningToilet) {
      data.cleaningToiletAmount =
        Number(data.cleaningToilet) * extraServiceData.toiletWashing;
    }
    if (data.childcareHour) {
      data.childCareAmount =
        Number(data.childcareHour) * extraServiceData.childCare;
    }
    if (trialTimeSlot) {
      data.trailTime = trialTimeSlot;
    }
    if (data.cookingTimeDetail?.morning) {
      data.morningCookingTime = data.cookingTimeDetail?.morning;
    }
    if (data.cookingTimeDetail?.noon) {
      data.noonCookingTime = data.cookingTimeDetail?.noon;
    }
    if (data.cookingTimeDetail?.night) {
      data.nightCookingTime = data.cookingTimeDetail?.night;
    }
    delete data.cookingTimeDetail;
    console.log(data);
    data.totalBill = totalBill;
    console.log(data);
    try {
      const result = await mutateAsync(data).unwrap();
      console.log(result);
      if (result?.success) {
        return showAlert({
          title: "আবেদন সফল",
          type: "success",
          description: result?.message,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      return showAlert({
        title: "আবেদন ব্যর্থ",
        type: "error",
        description:
          error?.data?.message ||
          "দুঃখিত! আবেদনটি সম্পন্ন করা যায়নি। আবার চেষ্টা করুন।",
      });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-xl shadow border border-gray-200 p-5">
          <h1 className="text-xl font-bold">রান্না বিষয়ক তথ্য</h1>

          <div className=" grid grid-cols-1 gap-5 mt-3">
            <CustomInput
              name="people"
              label="কতজনের জন্য রান্না?"
              type="number"
              placeholder="কতজনের জন্য রান্না?"
              register={register}
              required
              error={errors.people}
              errorMessage={"অনুগ্রহ করে কতজনের জন্য রান্না করবেন তা লিখুন"}
            />

            <CustomSelect
              control={control}
              name="timesPerDay"
              label="দৈনিক কতবার রান্না?"
              options={cookingPerDayOptions}
              required
              error={errors.timesPerDay}
            />

            {timesPerDay && (
              <CustomSelect
                control={control}
                name="cookingTime"
                label="কখন রান্না করবে?"
                options={cookingOptions[timesPerDay] || []}
                required
              />
            )}

            {selectedTimes.map((time) => (
              <CustomDropdown
                required
                key={time}
                control={control}
                name={`cookingTimeDetail.${time}`}
                label={
                  time === "morning"
                    ? "সকালের রান্নার সময়"
                    : time === "noon"
                      ? "দুপুরের রান্নার সময়"
                      : "রাতের রান্নার সময়"
                }
                placeholder={
                  time === "morning"
                    ? "সকালের রান্নার সময়"
                    : time === "noon"
                      ? "দুপুরের রান্নার সময়"
                      : "রাতের রান্নার সময়"
                }
                options={timeOptionsMap[time]}
                error={errors.cookingTimeDetail?.[time]}
                errorMessage={
                  time === "morning"
                    ? "সকালের রান্নার সময় দিন"
                    : time === "noon"
                      ? "দুপুরের রান্নার সময় দিন"
                      : time === "night"
                        ? "রাতের রান্নার সময় দিন"
                        : ""
                }
              />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow border flex flex-col gap-3 border-gray-200 p-5  mt-5">
          <h1 className="text-xl font-bold">অতিরিক্ত সেবা</h1>

          <div>
            <CustomCheckbox
              checked={clothesWashing}
              id="washCloth"
              label="কাপড় ধোয়া লাগবে?"
              onCheckedChange={setClothesWashing}
            />

            {clothesWashing && (
              <div className="border border-gray-200 shadow px-8 py-2 rounded-md max-w-sm mt-2">
                <div>
                  <CustomSelect
                    control={control}
                    label="মাসে কতবার?"
                    name="clothWashing"
                    options={washingFrequencyOptions}
                  />
                  <p className="text-[14px] text-muted-foreground flex items-center gap-1 pt-2">
                    <Info className="w-3 h-3" />
                    {extraServiceData?.washingClothPerson *
                      Number(clothesWashingFreq || null)}{" "}
                    যোগ হবে (৳{extraServiceData?.washingClothPerson}/বার)
                  </p>
                </div>
              </div>
            )}
          </div>

          <div>
            <CustomCheckbox
              checked={toiletCleaning}
              id="toiletWash"
              label="টয়লেট পরিষ্কার লাগবে?"
              onCheckedChange={setToiletCleaning}
            />

            {toiletCleaning && (
              <div className="border border-gray-200 shadow px-8 py-2 rounded-md max-w-sm mt-2">
                <div>
                  <CustomSelect
                    control={control}
                    label="মাসে কতবার?"
                    name="cleaningToilet"
                    options={washingFrequencyOptions}
                  />
                  <p className="text-[14px] text-muted-foreground flex items-center gap-1 pt-2">
                    <Info className="w-3 h-3" />
                    {extraServiceData?.toiletWashing *
                      Number(cleaningToiletFreq || null)}{" "}
                    যোগ হবে (৳{extraServiceData?.toiletWashing}/বার)
                  </p>
                </div>
              </div>
            )}
          </div>

          <div>
            <CustomCheckbox
              checked={childCare}
              id="childCare"
              label="শিশু যত্ন লাগবে?"
              onCheckedChange={setChildCare}
            />

            {childCare && (
              <div className="border border-gray-200 shadow px-2 py-2 rounded-md max-w-sm mt-2 ">
                <div className="grid grid-cols-2 gap-2">
                  <CustomDropdown
                    control={control}
                    name="childAge"
                    options={childAgeOptions}
                    placeholder="শিশুর বয়স"
                  />
                  <CustomDropdown
                    control={control}
                    name="childcareHour"
                    options={childCareHoursOptions}
                    placeholder="দৈনিক কত ঘণ্টা?"
                  />
                </div>

                <p className="text-[14px] pt-2 text-muted-foreground flex items-center gap-1">
                  <Info className="w-3 h-3" />৳
                  {Number(childCareHours || null) * extraServiceData?.childCare}{" "}
                  যোগ হবে (৳{extraServiceData?.childCare}/ঘণ্টা)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* <FinalDetails /> */}
        <div className="bg-white rounded-xl shadow border  border-gray-200 p-5  mt-5">
          <h1 className="text-xl font-bold">অন্যান্য তথ্য</h1>
          <div className="pt-3 flex flex-col gap-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div className="max-w-md">
                <CustomDateAndTimeSelector
                  control={control}
                  name="startingDate"
                  label="শুরুর তারিখ"
                  placeholder="শুরুর তারিখ"
                  required
                  rules={{
                    required: "শুরুর তারিখ তারিখ নির্বাচন করুন",
                  }}
                />
              </div>
              <div className="max-w-md">
                <CustomDropdown
                  control={control}
                  name="paymentDate"
                  options={monthDateOptions}
                  placeholder="বেতন পরিশোধের তারিখ"
                  label="বেতন পরিশোধের তারিখ"
                  required
                  error={errors.paymentDate}
                  errorMessage="বেতন পরিশোধের তারিখ নির্বাচন করুন"
                />
                <p className="text-[14px] text-muted-foreground mt-1 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  বেতন প্রতি মাসের ১-১০ তারিখের মধ্যে পরিশোধ করতে হবে
                </p>
              </div>

              <div className="max-w-md">
                <CustomInput
                  label="ব্যবহারকারী নাম"
                  name="consumerName"
                  placeholder="ব্যবহারকারী নাম"
                  register={register}
                  type="text"
                  required
                  error={errors.consumerName}
                  errorMessage="অনুগ্রহ করে ব্যবহারকারী নাম লিখুন"
                />
              </div>
              <div className="max-w-md">
                <CustomInput
                  name="consumerPhoneNumber"
                  placeholder="ফোন নম্বর"
                  label="ফোন নম্বর"
                  register={register}
                  type="text"
                  required
                  error={errors.consumerPhoneNumber}
                  errorMessage="অনুগ্রহ করে ফোন নম্বর লিখুন"
                />
              </div>
            </div>

            <CustomTextArea
              name="address"
              placeholder="বাসা/ফ্ল্যাট নম্বর, রোড, এলাকা, থানা"
              register={register}
              maxWords={100}
              error={errors.address}
              required
              errorMessage="বাসা/ফ্ল্যাট নম্বরসহ পূর্ণ ঠিকানা দিন"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow border border-gray-200 p-5 pb-5 mt-5">
          <h1 className="text-xl font-bold pb-3">এক দিনের ফ্রি ট্রায়াল</h1>
          <div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    ট্রায়ালের জন্য ৳১০০ অগ্রিম বাধ্যতামূলক
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    এই টাকা আপনার পেমেন্ট রেকর্ডে দেখানো হবে। ট্রায়ালে সন্তুষ্ট
                    হলে মাসিক চুক্তি করতে পারবেন।
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 max-w-lg">
              <CustomDateAndTimeSelector
                control={control}
                name="freeTrailDate"
                label="ট্রায়ালের তারিখ"
                placeholder="ট্রায়ালের তারিখ"
                showTime
              />
            </div>

            <div className="pt-5">
              <h1 className="mb-2">ট্রায়াল সময়কাল নির্বাচন করুন</h1>
              <div className="flex gap-5 items-center justify-center">
                {trialOptions.map(({ icon: Icon, label, value }) => {
                  const isActive = trialTimeSlot === value;
                  return (
                    <div
                      key={value}
                      onClick={() => setTrialTimeSlot(value as TFreeTrailTime)}
                      className={`
                flex items-center gap-2 px-8 py-2 border rounded-lg cursor-pointer transition
                ${isActive ? "bg-primary text-white border-primary" : "bg-white text-gray-700 hover:bg-gray-100"}
              `}
                    >
                      <Icon size={15} />
                      <span>{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Payment Status */}
            {/* {trialPaymentCompleted && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        ৳১০০ ট্রায়াল ফি পরিশোধ সম্পন্ন
                      </span>
                    </div>
                  </div>
                )} */}
          </div>
        </div>

        <div className="text-center text-5xl font-semibold pt-8">
          {totalBill}
        </div>
        <div className="flex justify-center w-full pt-5 max-w-lg mx-auto">
          <Button
            type="submit"
            disabled={isLoading}
            className="text-center h-10 max-w-lg w-full  text-lg"
          >
            জমা দিন
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MonthlyForm;
{
  /* <AdditionalServices />
      <FinalDetails />
      <PriceSummary />

      <Button className="w-full h-12 mt-5">
        <CheckCircle className="w-5 h-5 mr-2" />
        আবেদন জমা দিন
      </Button> */
}
