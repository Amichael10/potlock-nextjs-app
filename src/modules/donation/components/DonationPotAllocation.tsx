import { useCallback, useMemo } from "react";

import { values } from "remeda";

import { ByPotId, potlock } from "@/common/api/potlock";
import { NearIcon } from "@/common/assets/svgs";
import { NEAR_TOKEN_DENOM } from "@/common/constants";
import { yoctoNearToFloat } from "@/common/lib";
import { ByAccountId } from "@/common/types";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  RadioGroup,
  RadioGroupItem,
  ScrollArea,
  Skeleton,
} from "@/common/ui/components";
import {
  CheckboxField,
  SelectField,
  SelectFieldOption,
  TextField,
} from "@/common/ui/form-fields";
import {
  AccountOption,
  AvailableTokenBalance,
  ModalErrorBody,
  useNearUsdDisplayValue,
} from "@/modules/core";
import { DonationPotDistributionStrategyEnum } from "@/modules/donation";

import { DonationVerificationWarning } from "./DonationVerificationWarning";
import { DONATION_INSUFFICIENT_BALANCE_ERROR } from "../constants";
import {
  DonationAllocationInputs,
  DonationInputs,
  donationPotDistributionStrategies,
} from "../models";

export type DonationPotAllocationProps = ByPotId &
  DonationAllocationInputs & {};

export const DonationPotAllocation: React.FC<DonationPotAllocationProps> = ({
  form,
  isBalanceSufficient,
  balanceFloat,
  potId,
}) => {
  const [amount, tokenId, potDistributionStrategy, potDonationPlan] =
    form.watch([
      "amount",
      "tokenId",
      "potDistributionStrategy",
      "potDonationPlan",
    ]);

  const {
    isLoading: isPotLoading,
    data: pot,
    error: potError,
  } = potlock.usePot({ potId });

  const {
    isLoading: isPotApplicationListLoading,
    data: { results: potApplications } = { results: [] },
    error: potApplicationsError,
  } = potlock.usePotApplications({ potId, page_size: 100 });

  const isLoading = isPotLoading || isPotApplicationListLoading;
  const error = potError ?? potApplicationsError;
  const nearAmountUsdDisplayValue = useNearUsdDisplayValue(amount);

  const handleDonationPlanChange = useCallback(
    ({ accountId }: ByAccountId): React.ChangeEventHandler<HTMLInputElement> =>
      ({ target: { value } }) =>
        form.setValue(
          "potDonationPlan",

          potDonationPlan?.reduce(
            (entries, entry) => {
              if (entry.account_id === accountId) {
                return entries?.concat([
                  {
                    ...entry,
                    account_id: accountId,
                    amount: parseFloat(value),
                  },
                ]);
              } else return entries ?? [];
            },

            [] as DonationInputs["potDonationPlan"],
          ),
        ),

    [form, potDonationPlan],
  );

  const generalSection = useMemo(
    () =>
      pot ? (
        <DialogDescription>
          <FormField
            control={form.control}
            name="potDistributionStrategy"
            render={({ field }) => (
              <FormItem className="gap-3">
                {isPotLoading ? (
                  <Skeleton className="w-59 h-3.5" />
                ) : (
                  <FormLabel className="font-600">
                    {"How do you want to allocate funds?"}
                  </FormLabel>
                )}

                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {values(donationPotDistributionStrategies).map(
                      ({ label, hint, hintIfDisabled, value }) => (
                        <FormItem key={value}>
                          <RadioGroupItem
                            id={`donation-options-${value}`}
                            isLoading={isPotLoading}
                            checked={
                              field.value ===
                              DonationPotDistributionStrategyEnum[value]
                            }
                            hint={field.disabled ? hintIfDisabled : hint}
                            disabled={field.disabled}
                            {...{ label, value }}
                          />
                        </FormItem>
                      ),
                    )}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <DonationVerificationWarning />

          {potDistributionStrategy === "evenly" ? (
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <TextField
                  label="Amount"
                  {...field}
                  labelExtension={<AvailableTokenBalance {...{ tokenId }} />}
                  inputExtension={
                    <FormField
                      control={form.control}
                      name="tokenId"
                      render={({ field: inputExtension }) => (
                        <SelectField
                          embedded
                          label="Available tokens"
                          disabled //? FT donation is not supported in pots
                          defaultValue={inputExtension.value}
                          onValueChange={inputExtension.onChange}
                          classes={{
                            trigger:
                              "mr-2px h-full w-min rounded-r-none shadow-none",
                          }}
                        >
                          <SelectFieldOption value={NEAR_TOKEN_DENOM}>
                            {NEAR_TOKEN_DENOM.toUpperCase()}
                          </SelectFieldOption>
                        </SelectField>
                      )}
                    />
                  }
                  type="number"
                  placeholder="0.00"
                  min={yoctoNearToFloat(pot.min_matching_pool_donation_amount)}
                  max={balanceFloat ?? undefined}
                  step={0.01}
                  appendix={nearAmountUsdDisplayValue}
                  customErrorMessage={
                    isBalanceSufficient
                      ? null
                      : DONATION_INSUFFICIENT_BALANCE_ERROR
                  }
                />
              )}
            />
          ) : (
            <div>
              <span className="prose">{"Total allocated"}</span>
            </div>
          )}
        </DialogDescription>
      ) : null,

    [
      balanceFloat,
      form.control,
      isBalanceSufficient,
      isPotLoading,
      nearAmountUsdDisplayValue,
      pot,
      potDistributionStrategy,
      tokenId,
    ],
  );

  const projectList = useMemo(
    () =>
      pot
        ? potApplications.map(({ applicant }) => (
            <AccountOption
              key={applicant.id}
              accountId={applicant.id}
              secondaryAction={
                potDistributionStrategy === "evenly" ? (
                  <FormField
                    name="potDonationPlan"
                    control={form.control}
                    render={({ field: { onChange, value = [], ...field } }) => (
                      <CheckboxField
                        {...field}
                        checked={value.some(
                          ({ account_id, amount }) =>
                            account_id === applicant.id && amount !== 0,
                        )}
                        onCheckedChange={(checked) =>
                          onChange(
                            checked
                              ? value.concat([{ account_id: applicant.id }])
                              : value.filter(
                                  ({ account_id }) =>
                                    account_id !== applicant.id,
                                ),
                          )
                        }
                      />
                    )}
                  />
                ) : (
                  <FormField
                    name="potDonationPlan"
                    control={form.control}
                    render={({ field: { value = [], ...field } }) => {
                      const recipientEntry = value.find(
                        ({ account_id }) => account_id === applicant.id,
                      );

                      return (
                        <TextField
                          {...field}
                          type="number"
                          placeholder="0.00"
                          min={yoctoNearToFloat(
                            pot.min_matching_pool_donation_amount,
                          )}
                          max={balanceFloat ?? undefined}
                          step={0.01}
                          defaultValue={recipientEntry?.amount}
                          onChange={handleDonationPlanChange({
                            accountId: applicant.id,
                          })}
                          appendix={<NearIcon width={24} height={24} />}
                          customErrorMessage={
                            isBalanceSufficient
                              ? null
                              : DONATION_INSUFFICIENT_BALANCE_ERROR
                          }
                        />
                      );
                    }}
                  />
                )
              }
            />
          ))
        : null,

    [
      balanceFloat,
      form.control,
      handleDonationPlanChange,
      isBalanceSufficient,
      pot,
      potApplications,
      potDistributionStrategy,
    ],
  );

  return error ? (
    <ModalErrorBody
      heading="Pot donation"
      title="Unable to load pot data!"
      message={error.message}
    />
  ) : (
    <>
      {isLoading && (
        <span
          un-flex="~"
          un-justify="center"
          un-items="center"
          un-w="full"
          un-h="40"
          un-text="2xl"
        >
          Loading...
        </span>
      )}

      {pot && (
        <DialogHeader>
          <DialogTitle>{`Donation to Projects in ${pot.name}`}</DialogTitle>
        </DialogHeader>
      )}

      {generalSection}

      <ScrollArea className="h-[190px] w-full">
        <div un-flex="~ col" un-items="center" un-gap="0.5">
          {projectList}
        </div>
      </ScrollArea>
    </>
  );
};
