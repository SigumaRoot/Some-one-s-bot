{ pkgs }: {
	deps = [
		pkgs.cron
  pkgs.sudo
  pkgs.rcs
  pkgs.nodejs-16_x
        pkgs.nodePackages.typescript-language-server
        pkgs.yarn
        pkgs.replitPackages.jest
	];
}