package com.grupo04.culturarte.utils;

public class ServiceStatus {
	private static boolean isServiceUp = true;

	public static boolean isServiceUp() {
		return isServiceUp;
	}

	public static void setServiceUp(boolean serviceUp) {
		isServiceUp = serviceUp;
	}
}
