import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CleanTalkApi implements ICredentialType {
	name = 'cleanTalkApi';

	displayName = 'CleanTalk API';

	icon: Icon = { light: 'file:../icons/cleantalk.svg', dark: 'file:../icons/cleantalk.dark.svg' };

	documentationUrl =
		'https://github.com/CleanTalk/n8n-nodes-cleantalk?tab=readme-ov-file#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'Access Key',
			name: 'accessKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'Your CleanTalk Anti-Spam access key. Find it in the CleanTalk dashboard at cleantalk.org/my (Services > Access key).',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			body: {
				auth_key: '={{$credentials.accessKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.cleantalk.org',
			url: '/',
			method: 'GET',
			qs: {
				method_name: 'notice_paid_till',
				auth_key: '={{$credentials.accessKey}}',
			},
		},
		rules: [
			{
				type: 'responseSuccessBody',
				properties: {
					key: 'data.valid',
					value: 0,
					message:
						'The access key is not valid. Copy it from cleantalk.org/my (Services > Access key).',
				},
			},
		],
	};
}
