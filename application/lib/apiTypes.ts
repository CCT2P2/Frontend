export interface UserLoginRequest {
    username: string;
    password: string;
}

export interface UserLoginResponse {
    user_id: number;
}

export interface UserRegistrationRequest {
    email: string;
    username: string;
    password: string;
}

export interface UserRegistrationResponse {
    user_id: number;
}

export interface GetUserProfileResponse {
    id: number;
    email: string;
    username: string;
    img_path?: string;
    post_ids?: number[];
    community_ids?: number[];
    tags?: number[];
    admin: number;
    display_name?: string;
    description?: string;
}

export interface UpdateUserProfileRequest {
    img_path: string;
    password: string;
}

export interface UpdateUserProfileBackendRequest {
    communities: number[];
    POST_Ids: number[];
    TAGS: number[];
}

export interface CreateCommunityRequest {
    name: string;
    description: string;
    img_path: string;
    tags: number[]
}

export interface CreateCommunityResponse {
    community_id: number;
}

export interface GetCommunityResponse {
    id: number;
    name: string;
    description: string
    img_path: string;
    member_count: number;
    tags: number[];
    post_ids: number[];
}

export interface UpdateCommunityUserRequest {
    description: string;
    img_path: string;
}

export interface UpdateCommunityBackendRequest {
    member_count: number;
    tags: number[];
    POST_IDs: number[];
}

export interface CreatePostRequest {
    title: string;
    main_text: string;
    auth_id: number;
    com_id: number;
    post_id_ref?: number;
    comment_flag: boolean;
}

export interface CreatePostResponse {
    post_id: number;
}

export interface GetPostResponse {
    id: number;
    title: string;
    main_text: string;
    auth_id: number;
    com_id: number;
    timestamp: Date;
    likes: number;
    dislikes: number;
    post_id_ref: number;
    comment_flag: boolean;
    comment_count: number;
    comments: number[];
}

export interface UpdatePostUserRequest {
    title: string;
    main_text: string;
}

export interface UpdatePostBackendRequest {
    COMMENT_CNT: number;
    LIKES: number;
    DISLIKES: number;
    COMMENTS: string[];
}

export interface VoteRequest {
    likes: number;
    dislikes: number;
}

export interface CommentsRequest {
    Comments: number[];
}

export interface SearchPostsResponse {
    results: {
        post_id: number;
        title: string;
        main_text: string;
        timestamp: Date;
    }[];
}

export interface SearchUserResponse {
    results: {
        user_id: number;
        username: string;
        IMG_PATH: string;
    }[];
}

export type GetAllCommunitiesResponse = {
    names: string;
    description: string;
    communityID: number;
}[]