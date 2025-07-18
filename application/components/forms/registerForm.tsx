"use client";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dispatch,
	SetStateAction,
	useActionState,
	useEffect,
	useState,
} from "react";
import { createAccount } from "@/lib/actions/createAccount";
import { FormInput } from "@/components/forms/formComponents";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/dist/client/app-dir/link";
import { useUISettings } from "@/app/store/useUISettings";
import { useFormStatus } from "react-dom";
import LoadingSpinner from "@/components/general/loadingSpinner";

export default function RegisterForm() {
	const [pending, setPending] = useState(false);
	const [formState, dispatch] = useActionState(createAccount, {});
	const { blur } = useUISettings();
	return (
		<>
			<dialog
				id="terms-overlay"
				className="modal bg-background border border-border rounded-lg p-8 w-[600px]"
			>
				<div className="flex flex-col gap-4 text-white">
					<h2 className="text-2xl font-bold">Terms and Conditions</h2>
					<div className="text-sm">
						<p>By using our service, you agree to the following terms:</p>
						<ul className="list-disc pl-4 mt-2 space-y-2">
							<li className="font-bold">Temporary Project</li>
							<li>
								Gnu Forum (&quot;Gnuf&quot;) is a temporary, university project
								created by students at Aalborg University. The service is
								provided &quot;as is&quot; with no guarantees regarding
								availability, security, or content moderation.
							</li>

							<li className="font-bold">User Responsibility</li>
							<li>
								You are solely responsible for any content you post. Gnuf does
								not pre-screen submissions and disclaims liability for
								user-generated content. You agree not to post unlawful, harmful,
								or otherwise inappropriate material.
							</li>

							<li className="font-bold">Security and Privacy</li>
							<li>
								While basic security measures are implemented, including
								password hashing and IP blocking, Gnuf makes no guarantees
								regarding the security of user data or the privacy of personal
								information. Use the service at your own risk.
							</li>

							<li className="font-bold">Age Restriction</li>
							<li>
								This service is intended for individuals aged 16 and older. If
								you are under 16 years of age, you may not use Gnuf.
							</li>

							<li className="font-bold">Geographical Restriction</li>
							<li>
								Gnuf is intended solely for access and use within Denmark.
								Access from other jurisdictions is restricted due to legal
								compliance reasons. Users accessing from restricted regions must
								immediately discontinue use.
							</li>

							<li className="font-bold">Limitation of Liability</li>
							<li>
								Gnuf and its creators disclaim all responsibility for damages,
								losses, or issues arising from the use or inability to use the
								service. The service will operate for a limited duration
								(approximately 3 weeks) and may be terminated at any time
								without notice.
							</li>
						</ul>
					</div>
					<div className="flex justify-end">
						<Button
							variant="outline"
							onClick={() => {
								const dialog = document.getElementById(
									"terms-overlay",
								) as HTMLDialogElement;
								dialog?.close();
							}}
						>
							Close
						</Button>
					</div>
				</div>
			</dialog>

			<Card className={`w-[28rem] relative py-8 light-glow-primary`}>
				<CardHeader>
					<div className={"flex justify-center mb-4"}>
						<Image
							src={"/GNUF.svg"}
							alt="Home"
							width={170}
							height={170}
							className={"p-2"}
						/>
					</div>
					<CardTitle>Register</CardTitle>
					{formState.message && !pending && (
						<div className="text-red-500">{formState.message}</div>
					)}
				</CardHeader>
				<CardContent>
					<form action={dispatch}>
						<div className={"flex flex-col gap-4 mt-4"}>
							<FormInput
								formState={formState}
								fieldName={"username"}
								label={"Username"}
								placeholder={"Username"}
								inputType={"text"}
								isPending={pending}
								required
							/>
							<FormInput
								formState={formState}
								fieldName={"email"}
								label={"Email"}
								placeholder={"name@example.com"}
								inputType={"email"}
								isPending={pending}
								required
							/>
							<FormInput
								formState={formState}
								fieldName={"password"}
								label={"Password"}
								placeholder={"password"}
								inputType={"password"}
								isPending={pending}
								required
							/>
							<FormInput
								formState={formState}
								fieldName={"confirmPassword"}
								label={"Confirm Password"}
								placeholder={"password"}
								inputType={"password"}
								isPending={pending}
								required
							/>
						</div>
						<div className={"flex gap-2 mt-6 items-center"}>
							<Checkbox id={"age"} required />
							<Label htmlFor={"age"}>
								I confirm that I am above the age of 16
							</Label>
						</div>
						<div className={"flex gap-2 mt-4 items-center"}>
							<Checkbox id={"tos"} required />
							<Label htmlFor={"tos"}>
								I agree to{" "}
								<button
									onClick={() => {
										const dialog = document.getElementById(
											"terms-overlay",
										) as HTMLDialogElement;
										dialog?.showModal();
									}}
									className="underline underline-offset-4 text-purple-300 hover:text-purple-400"
								>
									Terms and Conditions
								</button>
							</Label>
						</div>
						<div className={"flex flex-col justify-center gap-8 mt-10"}>
							<RegisterButton setPending={setPending} />
							<div className="text-center text-sm">
								Already have an account?{" "}
								<Link
									href="/login"
									className="underline underline-offset-4 text-purple-300"
								>
									Sign in
								</Link>
							</div>
						</div>
					</form>
				</CardContent>
			</Card>
		</>
	);
}

function RegisterButton({
	setPending,
}: {
	setPending: Dispatch<SetStateAction<boolean>>;
}) {
	const status = useFormStatus();

	useEffect(() => {
		setPending(status.pending);
	}, [setPending, status.pending]);

	return (
		<Button variant={"outline"} size={"lg"} disabled={status.pending}>
			{status.pending ? "Loading..." : "Register"}
		</Button>
	);
}
