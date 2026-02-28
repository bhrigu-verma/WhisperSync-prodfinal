"use client"
import { useSession } from "next-auth/react";
import { PricingCard } from "./pricing-card";

const pricingPlans = [
  {
    name: 'Free',
    price: '0',
    features: [
      'Up to 3 videos per month',
      'Basic transcription accuracy',
      'SRT & ASS export',
      'Community support',
    ],
  },
  {
    name: 'Pro',
    price: '12',
    features: [
      'Up to 30 videos per month',
      'Enhanced accuracy',
      'Custom caption styles',
      'Download transcription files',
      'Edit transcriptions inline',
      'Priority support',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '60',
    features: [
      'Unlimited videos',
      'Highest accuracy',
      '24/7 dedicated support',
      'API access',
      'Custom integrations',
      'Team workspace',
    ],
  },
];

const Pricing = () => {
  const {data: session} = useSession()
  //@ts-expect-error: Plan exist type
  const currentPlan = session?.user.plan
       
  return (
    <section id="pricing" className="py-20 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Simple Transparent Pricing</h2>
          <p className="text-xl text-gray-300 mb-12">Choose the plan that&apos;s right for you</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <PricingCard
              //@ts-expect-error: name type
              name={session?.user?.name }
             
              email={session?.user?.email}
              currentPlan={currentPlan}
              key={plan.name}
              plan={plan}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;