import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import { UserSnapshot } from "../../models"

const convertImage = (raw, url) => {
  return {
    id: raw.id,
    name: raw.formats.thumbnail.name,
    url: `${url}${raw.formats.thumbnail.url}`,
  }
}
const convertUser = (raw, url) => {
  return {
    user: {
      id: raw.user.id,
      username: raw.user.username,
      name: raw.user.name,
      email: raw.user.email,
      barber: raw.user.barber,
      description: raw.user.description,
      image: convertImage(raw.user.image, url),
      jwt: raw.jwt,
    },
    kind: "ok",
  }
}
const convertBarber = (raw, url) => {
  return {
    id: raw.id,
    username: raw.username,
    name: raw.name,
    email: raw.email,
    barber: raw.barber,
    description: raw.description,
    image: convertImage(raw.image, url),
  }
}

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  async login(data): Promise<Types.GetLoginResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post(`/auth/local`, data)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawUser = response.data
      const resultUser: UserSnapshot = convertUser(rawUser, this.config.url)
      return { kind: "ok", user: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async signin(data, image): Promise<Types.GetLoginResult> {
    const filename = image.split("/").pop()
    const match = /\.(\w+)$/.exec(filename)
    const type = match ? `image/${match[1]}` : `image`

    const fd = new FormData()
    fd.append("data", JSON.stringify(data))
    fd.append("files.files", {
      uri: image,
      name: filename,
      type: type,
    })

    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post(`auth/local/register`, fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawUser = response.data
      const resultUser: Types.GetLoginResult = {
        ...convertUser(rawUser, this.config.url),
        kind: "ok",
      }
      return resultUser
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getBarbers(): Promise<Types.GetBarbersResults> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users`)
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawBarbers = response.data
      const resultBarbers: UserSnapshot[] = rawBarbers.map((i: any) =>
        convertBarber(i, this.config.url),
      )
      return { kind: "ok", barbers: resultBarbers }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
